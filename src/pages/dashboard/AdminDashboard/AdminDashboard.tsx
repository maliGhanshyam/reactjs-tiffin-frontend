import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { Retailer } from "./AdminDashboard.types";
import {
  approveRetailer,
  getApprovedRetail,
  getPendingRetail,
  getRejectedRetail,
  rejectRetailer,
} from "../../../services/Retailer";
import { ActionCard } from "../../../components/ActionCard";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  buttonStyle,
  buttonStyle2,
  containerStyle,
  gridContainer,
  innerContainerStyle,
  modalActions,
  modalButton,
  modalContent,
  modalTitle,
  paperStyle,
  sectionTitle,
  summaryTypography,
} from "./AdminDashboard.styles";
import { CardSlider } from "../../../components/CardSlider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const AdminDashboard = () => {
  const [retailer, setRetailer] = useState<Retailer[]>([]);
  const [rejectedRetailers, setRejectedRetailer] = useState<Retailer[]>([]);
  const [approveRetailers, setApproveRetailer] = useState<Retailer[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null
  );
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchRejectedRetailers();
    fetchApprovedRetailers();
    fetchRetailers();
  }, []);

  const fetchRetailers = async () => {
    try {
      const data = await getPendingRetail();
      setRetailer(data);
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
      setRejectedRetailer(data);
      setRejectedCount(data.length);
    } catch (error) {
      console.error("Error fetching rejected retailers:", error);
    }
  };

  const handleApprove = async (retailerId: string) => {
    try {
      await approveRetailer(retailerId);
      await fetchRetailers();
      await fetchApprovedRetailers();
      await fetchRejectedRetailers();
    } catch (error) {
      console.error("Error approving retailer:", error);
    }
  };

  const handleReject = async (retailerId: string) => {
    try {
      await rejectRetailer(retailerId);
      await fetchRetailers();
      await fetchApprovedRetailers();
      await fetchRejectedRetailers();
    } catch (error) {
      console.error("Error rejecting retailer:", error);
    }
  };

  // Open modal for approve/reject
  const openConfirmationModal = (
    retailer: Retailer,
    action: "approve" | "reject"
  ) => {
    setSelectedRetailer(retailer);
    setActionType(action); // Set action type (approve or reject)
    setOpenModal(true);
  };

  const closeConfirmationModal = () => {
    setOpenModal(false);
    setSelectedRetailer(null);
    setActionType(null);
  };

  const confirmAction = () => {
    if (!selectedRetailer || !actionType) return;
    if (actionType === "approve") {
      handleApprove(selectedRetailer._id);
    } else if (actionType === "reject") {
      handleReject(selectedRetailer._id);
    }
    closeConfirmationModal();
  };

  const truncateAddress = (address: string) => {
    return address.length > 30 ? address.slice(0, 30) : address;
  };

  return (
    <Box sx={containerStyle}>
      <Container sx={innerContainerStyle}>
        <Typography variant="h5" sx={summaryTypography}>
          Summary
        </Typography>
        <Grid2 container spacing={2} sx={gridContainer}>
          <Grid2 size={4}>
            <Paper sx={paperStyle}>
              <Typography variant="h6">Pending Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {pendingCount}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper sx={paperStyle}>
              <Typography variant="h6">Approved Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {approvedCount}
              </Typography>
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper sx={paperStyle}>
              <Typography variant="h6">Rejected Retailers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {rejectedCount}
              </Typography>
            </Paper>
          </Grid2>
        </Grid2>

        <Box sx={sectionTitle}>
          <Typography variant="h5">Available Pending Retailers</Typography>
          <Button
            sx={buttonStyle2}
            onClick={() =>
              navigate("/approved-retailers", { state: { viewTab: "pending" } })
            }
          >
            View More
          </Button>
        </Box>

        <CardSlider
          data={retailer}
          renderCard={(ret) => (
            <ActionCard
              title={ret.username}
              description={`Email: ${ret.email}`}
              status={ret.role_specific_details?.approval[0].approval_status}
              fields={[
                { label: "Contact", value: ret.contact_number },
                { label: "Address", value: truncateAddress(ret.address) },
              ]}
              onApprove={() => openConfirmationModal(ret, "approve")}
              onReject={() => openConfirmationModal(ret, "reject")}
            />
          )}
        />
        <Box sx={sectionTitle}>
          <Typography variant="h5">Available Approved Retailers</Typography>
          <Button
            sx={buttonStyle}
            onClick={() =>
              navigate("/approved-retailers", { state: { viewTab: "approved" } })
            }
          >
            View More
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
        <Box sx={sectionTitle}>
          <Typography variant="h5">Available Rejected Retailers</Typography>
          <Button
            sx={buttonStyle}
            onClick={() =>
              navigate("/approved-retailers", { state: { viewTab: "rejected" } })
            }
          >
            View More
          </Button>
        </Box>

        <CardSlider
          data={rejectedRetailers}
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

        <Dialog
          open={openModal}
          onClose={closeConfirmationModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={modalTitle}>
            {actionType === "approve" ? (
              <CheckCircleOutlineIcon color="success" />
            ) : (
              <WarningAmberIcon color="warning" />
            )}
            Confirm Action
          </DialogTitle>
          <DialogContent>
            <Box
              sx={modalContent}
            >
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Are you sure you want to{" "}
                {actionType === "approve" ? "approve" : "reject"} this retailer?
              </Typography>
              <Typography variant="body2" color="textSecondary">
                This action is{" "}
                {actionType === "approve" ? "beneficial" : "irreversible"} and
                may impact the retailer's status.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={modalActions}>
            <Button
              onClick={closeConfirmationModal}
              color="inherit"
              variant="outlined"
              sx={ modalButton }
            >
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              color={actionType === "approve" ? "success" : "warning"}
              variant="contained"
              sx={ modalButton }
            >
              {actionType === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
