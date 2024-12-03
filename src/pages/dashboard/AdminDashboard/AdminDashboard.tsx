import { useEffect, useState } from "react";
import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { CountValue, Retailer } from "./AdminDashboard.types";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardSlider } from "../../../components/CardSlider";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styles, tooltipStyle } from "./AdminDashboard.styles";
import { useSnackbar } from "../../../hook";
import {
  fetchRetailersWithPagination,
  getCount,
} from "../../../services/Retailer";
import { NoData } from "../../../components/NoData";
import noData from "../../../assets/noReports.svg";
import noGroups from "../../../assets/noCustomGroups.svg";
import RetailerCard from "../../../components/RetailerCard/RetailerCard";
// import { ResponsiveContainer } from "recharts";
const AdminDashboard = () => {
  const [approveRetailers, setApproveRetailer] = useState<Retailer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchApprovedRetailers();
    fetchRetailersCount();
  }, []);

  const fetchRetailersCount = async () => {
    try {
      const response: CountValue[] = await getCount();
      console.log(response);
      response.map((item) => {
        item.approval_status === "pending"
          ? setPendingCount(item.count)
          : item.approval_status === "approved"
          ? setApprovedCount(item.count)
          : setRejectedCount(item.count);
        console.log(pendingCount, approvedCount, rejectedCount);
      });
    } catch (error: any) {
      error.status === 401
        ? showSnackbar("Admin has not been approved yet.", "success")
        : showSnackbar("Error fetching count of retailers", "error");
    }
  };

  const fetchApprovedRetailers = async () => {
    try {
      const { data, totalItems } = await fetchRetailersWithPagination(
        "getapprovedRetailers"
      );
      setApproveRetailer(data);
      setApprovedCount(totalItems);
      if (totalItems === 0)
        showSnackbar("No approved retailers available", "success");
    } catch (error: any) {
      error.status === 401
        ? showSnackbar("Admin has not been approved yet.", "success")
        : showSnackbar("Error fetching pending retailers", "error");
    }
  };

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];
  const totalCount = pendingCount + approvedCount + rejectedCount;
  const showRetailersSlider = approveRetailers.length > 0;
  return (
    <Box sx={styles.innerContainerStyle}>
      <Grid2
        container
        size={{ sm: 12, xs: 8 }}
        spacing={4}
        sx={styles.outerGrid}
      >
        <Grid2 size={{ sm: 4, xs: 11 }}>
          {/* <ResponsiveContainer width="100%" height={240}> */}
          <Box sx={styles.innerGridA}>
            {totalCount === 0 ? (
              <NoData
                message={"No Data"}
                image={noGroups}
                boxStyle={styles.noDataBox}
                imgStyle={{
                  width: "100%",
                  height: "150px",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              />
            ) : (
              <PieChart width={300} height={240}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                >
                  <Cell key="Pending" fill="#ff7300" />
                  <Cell key="Approved" fill="#239b56 " />
                  <Cell key="Rejected" fill=" #c0392b" />
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{
                    paddingLeft: 30,
                  }}
                />
              </PieChart>
            )}
          </Box>
          {/* </ResponsiveContainer> */}
        </Grid2>
        <Grid2 size={{ sm: 7, xs: 11 }}>
          <Box sx={styles.taskBox}>
            <Box sx={styles.boyLogoStyle}></Box>
            <Box sx={styles.taskContainer}>
              <Typography variant="h5" sx={styles.taskHeader}>
                Task Box
              </Typography>
              <Paper sx={styles.paperStyle}>
                <Typography variant="body1">
                  Pending Retailers:&nbsp;&nbsp;{" "}
                </Typography>
                <Typography variant="h6" sx={styles.pendingCountStyle}>
                  {pendingCount}
                </Typography>
              </Paper>
              <Button
                variant="outlined"
                sx={styles.taskButton}
                onClick={() =>
                  navigate("/approved-retailers", {
                    state: { viewTab: "pending" },
                  })
                }
                startIcon={<VisibilityIcon />}
              >
                View More
              </Button>
            </Box>
            <Box sx={styles.girlLogoStyle}></Box>
          </Box>
        </Grid2>
      </Grid2>
      <Grid2 sx={styles.sectionTitle}>
        <Typography variant="h6">Approved Retailers</Typography>
        <Button
          sx={styles.buttonStyleSeeAll}
          variant="outlined"
          onClick={() =>
            navigate("/approved-retailers", {
              state: { viewTab: "approved" },
            })
          }
          startIcon={<VisibilityIcon />}
        >
          See all
        </Button>
      </Grid2>
      {showRetailersSlider ? (
        <CardSlider data={approveRetailers}>
          {(ret) => <RetailerCard retailer={ret} />}
        </CardSlider>
      ) : (
        <NoData
          message={"No Data"}
          image={noData}
          boxStyle={styles.noDataBox}
          imgStyle={{
            width: "100%",
            height: "150px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;

// const fetchRejectedRetailers = async () => {
  //   try {
  //     const { totalItems } = await fetchRetailersWithPagination(
  //       "getrejectedRetailers"
  //     );
  //     setRejectedCount(totalItems);
  //     if (totalItems === 0)
  //       showSnackbar("No rejected retailers available", "success");
  //   } catch (error: any) {
  //     error.status === 401
  //       ? showSnackbar("Admin has not been approved yet.", "success")
  //       : showSnackbar("Error fetching rejected retailers", "error");
  //   }
  // };
  
// const fetchRetailers = async () => {
  //   try {
  //     const { totalItems } = await fetchRetailersWithPagination(
  //       "pendingRetailers"
  //     );
  //     setPendingCount(totalItems);
  //     if (totalItems === 0)
  //       showSnackbar("No pending retailers available", "success");
  //   } catch (error: any) {
  //     error.status === 401
  //       ? showSnackbar("Admin has not been approved yet.", "success")
  //       : showSnackbar("Error fetching pending retailers", "error");
  //   }
  // };