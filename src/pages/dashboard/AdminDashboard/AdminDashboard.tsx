import { useEffect, useState } from "react";
import { Box, Button, Container, Grid2, Paper, Typography } from "@mui/material";
import { Retailer } from "./AdminDashboard.types";
import { approveRetailer,
  getApprovedRetailer,
  getPendingRetailers,
  getRejectedRetailer,
  rejectRetailer } from "../../../services/Retailer";
import { ActionCard } from "../../../components/ActionCard";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [retailer, setRetailer] = useState<Retailer[]>([]);
  const [rejectedRetailers, setRejectedRetailer] = useState<Retailer[]>([]);
  const [approveRetailers, setApproveRetailer] = useState<Retailer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();
  console.log(retailer);
  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const data = await getPendingRetailers();
        setRetailer(data.data);
        setPendingCount(data.data.length);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    const fetchApprovedRetailers = async () => {
      try {
        const data = await getApprovedRetailer();
        setApproveRetailer(data.data);
        setApprovedCount(data.data.length);
      } catch (error) {
        console.error("Error fetching rejected retailers:", error);
      }
    };
    fetchApprovedRetailers();
    fetchRetailers();
  }, []);

  useEffect(() => {
    const fetchRejectedRetailers = async () => {
      try {
        const data = await getRejectedRetailer();
        setRejectedRetailer(data.data);
        setRejectedCount(data.data.length);
      } catch (error) {
        console.error("Error fetching rejected retailers:", error);
      }
    };
    fetchRejectedRetailers();
  }, []);

  const handleApprove = async (retailerId: string) => {
    try {
      const data = await approveRetailer(retailerId);
      setRetailer((prev) => prev.filter((ret) => ret._id !== retailerId));
      setPendingCount((prev) => prev-1);
      setApproveRetailer((prev) => [...prev,data.data]);
      setApprovedCount((prev) => prev +1 );
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleReject = async (retailerId: string) => {
    try {
      const data = await rejectRetailer(retailerId);
      setRetailer((prev) => prev.filter((ret) => ret._id !== retailerId));
      setPendingCount((prev) => prev-1);
      setRejectedRetailer((prev) => [...prev,data.data]);
      setRejectedCount((prev) => prev+1);
    } catch (error) {
      console.error("Error rejecting:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
          Summary
        </Typography>
      <Grid2 container spacing={2} sx={{ mb: 4 }}>
          <Grid2 size={4}>
            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Pending Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{pendingCount}</Typography>
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Approved Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{approvedCount}</Typography>
            </Paper>
          </Grid2>
          <Grid2  size={4}>
            <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">Rejected Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{rejectedCount}</Typography>
            </Paper>
          </Grid2>
        </Grid2>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Available Pending Retailers
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
          {retailer.map((ret) => (
            <Box key={ret._id} sx={{ minWidth: 350, mr: 2 }}>
              <ActionCard
                title={ret.username}
                description={`Email: ${ret.email}`}
                status={"Pending" || "Approved"}
                fields={[
                  { label: "Contact", value: ret.contact_number },
                  { label: "Address", value: ret.address }
                ]}
                onApprove={() => handleApprove(ret._id)}
                onReject={() => handleReject(ret._id)}
              />
            </Box>
          ))}
        </Box>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Approved Retailers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/approved-retailers")}  // Navigate to new page
        >
          View Approved Retailers
        </Button>
      </Container>
    </Box>
  );
};

export default AdminDashboard;

// {
//   "statuscode": 200,
//   "data": [
//     {
//       "_id": "6727815fe01b053b665d441b",
//       "username": "retailertanvi",
//       "password": "$2b$10$PFVToMYyTGgDrGckofF0DeMVmIO2iABzKvrye49tqSEZLhrxSb/ie",
//       "email": "mailto:retailertanvi@example.com",
//       "contact_number": "1234567890",
//       "address": "123 Retailer St, Business City, BC 12345",
//       "role_id": "6723475f74b32cfe39e5d0a2",
//       "role_specific_details": {
//         "gst_no": "GST123456789",
//         "approval": [
//           {
//             "approval_status": "pending",
//             "organization_id": "671f84ea0e680b5e9e186082",
//             "istrendy": true
//           },
//           {
//             "approval_status": "pending",
//             "organization_id": "671f5b2247c2509fde2dfb41",
//             "istrendy": true
//           },
//           {
//             "approval_status": "pending",
//             "organization_id": "671f5b2247c2509fde2dfb41"
//           }
//         ]
//       },
//       "created_at": "2024-11-03T13:57:51.144Z",
//       "updated_at": "2024-11-03T13:57:51.144Z",
//       "__v": 0
//     }
//   ]
// }
