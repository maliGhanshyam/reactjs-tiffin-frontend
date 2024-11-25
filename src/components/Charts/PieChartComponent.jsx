import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import noTask from "../../assets/noTask.svg";
// import timeBloack from "../../assets/timeblock.png";

const styles = {
  card: {
    padding: 2,
    boxShadow: 3,
    borderRadius: 4,
    transition: "0.3s",
    "&:hover": { boxShadow: 6 },
  },
  taskBox: { display: "flex", alignItems: "center", gap: 2 },
  avatar: {
    flex: 1,
    height: "100%", // Full height within the task bar container
    objectFit: "cover", // Ensures image covers the area without distortion
    marginTop: "22px", // Equal top margin
    marginBottom: "8px", // Equal bottom margin
  },

  pendingCount: { fontWeight: "bold", color: "#c0392b" },
};

export default function PieChartComponent({ chartData }) {
  const navigate = useNavigate();

  // Moved getGreetingMessage logic here
  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const pendingCount =
    chartData.find((item) => item.name === "Pending")?.value || 0;

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Container disableGutters maxWidth={false}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Chart Section */}
          <Paper sx={{ ...styles.card, flexBasis: "35%", m: 0 }}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <PieChart width={450} height={300}>
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
                  <Cell key="Approved" fill="#239b56" />
                  <Cell key="Rejected" fill="#c0392b" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ paddingLeft: 30 }}
                />
              </PieChart>
            </Box>
          </Paper>

          {/* Task Section */}
          <Paper sx={{ ...styles.card, flexBasis: "65%", m: 0 }}>
            <Box sx={styles.taskBox}>
              {/* Left Image */}
              {/* <Box
                component="img"
                src={noTask}
                alt="Left Image"
                sx={styles.avatar}
              /> */}

              {/* Text Content */}
              <Box
                flex={1}
                textAlign="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  {getGreetingMessage()} !
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">
                    Pending Admins Approval:
                  </Typography>
                  <Typography variant="h6" sx={styles.pendingCount}>
                    {pendingCount}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: "12px" }}
                  onClick={() => navigate("/supAdmin")}
                  startIcon={<VisibilityIcon />}
                >
                  View More
                </Button>
              </Box>

              {/* Right Image */}
              <Box
                component="img"
                src={noTask}
                alt="Right Image"
                sx={styles.avatar}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
