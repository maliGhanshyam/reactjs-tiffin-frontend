import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { Retailer } from "./AdminDashboard.types";
import {
  getApprovedRetail,
  getPendingRetail,
  getRejectedRetail,
} from "../../../services/Retailer";
import { ActionCard } from "../../../components/ActionCard";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  boyLogoStyle,
  buttonStyle,
  buttonStyle2,
  cardTypography,
  girlLogoStyle,
  innerContainerStyle,
  innerGridA,
  outerGrid,
  paperStyle,
  pendingCountStyle,
  roundedCardStyle,
  sectionTitle,
  taskBox,
  taskButton,
  taskContainer,
  taskHeader,
  tooltipStyle,
} from "./AdminDashboard.styles";
import { CardSlider } from "../../../components/CardSlider";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AdminDashboard = () => {
  const [approveRetailers, setApproveRetailer] = useState<Retailer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRejectedRetailers();
    fetchApprovedRetailers();
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      const data = await getPendingRetail();
      setPendingCount(data.length);
    } catch (error) {
      console.error("Error fetching pending retailers:", error);
    }
  };

  const fetchApprovedRetailers = async () => {
    try {
      const data = await getApprovedRetail();
      setApproveRetailer(data);
      setApprovedCount(data.length);
    } catch (error) {
      console.error("Error fetching approved retailers:", error);
    }
  };

  const fetchRejectedRetailers = async () => {
    try {
      const data = await getRejectedRetail();
      setRejectedCount(data.length);
    } catch (error) {
      console.error("Error fetching rejected retailers:", error);
    }
  };

  const truncateAddress = (address: string) => {
    return address.length > 30 ? address.slice(0, 30) : address;
  };

  const chartData = [
    { name: "Pending", value: pendingCount },
    { name: "Approved", value: approvedCount },
    { name: "Rejected", value: rejectedCount },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Container sx={innerContainerStyle}>
        <Grid2 container size={{ sm: 12, xs: 8 }} sx={outerGrid}>
          <Grid2 size={{ sm: 4 }}>
            <Box sx={innerGridA}>
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
          <Grid2 size={{ sm: 6 }}>
            <Box sx={taskBox}>
              <Box sx={boyLogoStyle}></Box>
              <Box sx={taskContainer}>
                <Typography variant="h5" sx={taskHeader}>
                  Task Box
                </Typography>
                <Paper sx={paperStyle}>
                  <Typography variant="body2">
                    Pending Retailers:&nbsp;&nbsp;{" "}
                  </Typography>
                  <Typography variant="h6" sx={pendingCountStyle}>
                    {pendingCount}
                  </Typography>
                </Paper>
                <Button
                  variant="outlined"
                  sx={taskButton}
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
              <Box sx={girlLogoStyle}></Box>
            </Box>
          </Grid2>
        </Grid2>
        <Box sx={sectionTitle}>
          <Card sx={roundedCardStyle}>
            <Typography variant="h6" sx={cardTypography}>
              Approved Retailers
            </Typography>
          </Card>
          <Button
            sx={buttonStyle2}
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
        </Box>

        <CardSlider
          data={approveRetailers}
          renderCard={(ret) => (
            <ActionCard
              title={ret.username}
              description={`Email: ${ret.email}`}
              status={ret.role_specific_details?.approval[0].approval_status}
              fields={[
                { label: "Contact", value: ret.contact_number },
                { label: "Address", value: truncateAddress(ret.address) },
              ]}
            />
          )}
        />
      </Container>
    </Box>
  );
};

export default AdminDashboard;
