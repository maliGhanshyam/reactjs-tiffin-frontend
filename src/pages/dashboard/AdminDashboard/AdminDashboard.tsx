import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { Retailer } from "./AdminDashboard.types";
import { ActionCard } from "../../../components/ActionCard";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardSlider } from "../../../components/CardSlider";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styles, tooltipStyle } from "./AdminDashboard.styles";
import { RetailerInfoCard } from "../../../components/RetailerInfoCard";
import { useSnackbar } from "../../../hook";
import { fetchRetailersWithPagination } from "../../../services/Retailer";

const AdminDashboard = () => {
  const [approveRetailers, setApproveRetailer] = useState<Retailer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    fetchRejectedRetailers();
    fetchApprovedRetailers();
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      const {totalItems} = await fetchRetailersWithPagination("pendingRetailers"); 
      setPendingCount(totalItems);
    } catch (error) {
      showSnackbar("Error fetching pending retailers", "error");
    }
  };

  const fetchApprovedRetailers = async () => {
    try {
      const {data,totalItems} = await fetchRetailersWithPagination("getapprovedRetailers");
      setApproveRetailer(data);
      setApprovedCount(totalItems);
    } catch (error) {
      showSnackbar("Error fetching pending retailers", "error");
    }
  };

  const fetchRejectedRetailers = async () => {
    try {
      const {totalItems} = await fetchRetailersWithPagination("getrejectedRetailers");
      setRejectedCount(totalItems);
    } catch (error) {
      showSnackbar("Error fetching rejected retailers", "error");
    }
  };

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  return (
     <Box sx={styles.innerContainerStyle}>
        <Grid2 container size={{ sm: 12, xs: 8 }} spacing={4} sx={styles.outerGrid}>
        
          <Grid2 size={{ sm: 4, xs:11 }}>
            <Box sx={styles.innerGridA}>
              {/* Piechart */}
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
            </Box>
          </Grid2>
          <Grid2 size={{ sm: 7, xs:11 }}>
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

        <CardSlider data={approveRetailers}>
          {(ret) => (
            <ActionCard
              sx={styles.cardStyles}
              imageUrl={ret.user_image}
              imageStyles={styles.cardMediaStyles}
            >
              <RetailerInfoCard retailer={ret} />
            </ActionCard>
          )}
        </CardSlider>
     </Box>
  );
};

export default AdminDashboard;
