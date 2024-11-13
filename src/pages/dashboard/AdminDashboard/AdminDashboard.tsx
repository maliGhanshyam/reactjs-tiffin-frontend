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
  getApproved,
  getPending,
  getRejected,
} from "../../../services/Retailer";
import { ActionCard } from "../../../components/ActionCard";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CardSlider } from "../../../components/CardSlider";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styles, tooltipStyle } from "./AdminDashboard.styles";
import { useSnackbar } from "../../../context";

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
      const data = await getPending();
      setPendingCount(data.length);
    } catch (error) {
      showSnackbar("Error fetching pending retailers", "error");
      console.error("Error fetching pending retailers:", error);
    }
  };

  const fetchApprovedRetailers = async () => {
    try {
      const data = await getApproved();
      setApproveRetailer(data);
      setApprovedCount(data.length);
    } catch (error) {
      showSnackbar("Error fetching pending retailers", "error");
      console.error("Error fetching approved retailers:", error);
    }
  };

  const fetchRejectedRetailers = async () => {
    try {
      const data = await getRejected();
      setRejectedCount(data.length);
    } catch (error) {
      showSnackbar("Error fetching rejected retailers", "error");
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
      <Container sx={styles.innerContainerStyle}>
        <Grid2 container size={{ sm: 12, xs: 8 }} sx={styles.outerGrid}>
          <Grid2 size={{ sm: 4 }}>
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
          <Grid2 size={{ sm: 6 }}>
            <Box sx={styles.taskBox}>
              <Box sx={styles.boyLogoStyle}></Box>
              <Box sx={styles.taskContainer}>
                <Typography variant="h5" sx={styles.taskHeader}>
                  Task Box
                </Typography>
                <Paper sx={styles.paperStyle}>
                  <Typography variant="body2">
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
          <Card sx={styles.roundedCardStyle}>
            <Typography variant="h6" sx={styles.cardTypography}>
              Approved Retailers
            </Typography>
          </Card>
          <Button
            sx={styles.buttonStyle2}
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
              imageUrl="https://via.placeholder.com/400x320"
              imageStyles={styles.cardMediaStyles}
            >
              <Typography variant="h6" sx={styles.titleStyles}>
                {ret.username}
              </Typography>
              <Typography variant="body2" sx={styles.descriptionStyles}>
                {`Email: ${ret.email}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ...styles.typographyStyle,
                  color:
                    ret.role_specific_details?.approval[0]?.approval_status?.toLowerCase() ===
                    "approved"
                      ? "success.main"
                      : ret.role_specific_details?.approval[0]?.approval_status?.toLowerCase() ===
                          "pending"
                        ? "warning.main"
                        : "error.main",
                }}
              >
                Status:{" "}
                {ret.role_specific_details?.approval[0]?.approval_status}
              </Typography>
              <Box sx={styles.fieldsBoxStyles}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Contact:</strong> {ret.contact_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Address:</strong> {truncateAddress(ret.address)}
                </Typography>
              </Box>
            </ActionCard>
          )}
        </CardSlider>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
