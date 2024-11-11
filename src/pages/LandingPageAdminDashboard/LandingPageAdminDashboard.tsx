import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Pagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import {
  approveRetailer,
  getApprovedRetailer,
  getPendingRetailers,
  getRejectedRetailer,
  makeTrendy,
  rejectRetailer,
} from "../../services/Retailer";
import { ActionCard } from "../../components/ActionCard";
import { useLocation } from "react-router-dom";
import {
  buttonGroupStyle,
  cardContainerStyle,
  containerStyle,
  dialogActionsStyle,
  innerCardContainerStyle,
  modalActions,
  modalButton,
  modalContent,
  modalContentStyle,
  modalTitle,
  paginationStyle,
  tabButtonStyle,
  titleStyle,
} from "./LandingPageAdminDashboard.styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ApiResponse, ISnackbar } from "./LandingPageAdminDashboard.types";

const LandingPageAdminDashboard = () => {
  const [pendingRetailer, setPendingRetailer] = useState<Retailer[]>([]);
  const [approvedRetailers, setApprovedRetailers] = useState<Retailer[]>([]);
  const [rejectedRetailers, setRejectedRetailers] = useState<Retailer[]>([]);
  const [activeTab, setActiveTab] = useState<string>("approved"); // Default to "approved"
  const [openModal, setOpenModal] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null
  );
  // for dialog box
  const [actionType, setActionType] = useState<
    "approve" | "reject" | "trendy" | null
  >(null);
  //pagination
  const [page, setPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApprovedPages, setTotalApprovedPages] = useState(1);
  const [totalRejectedPages, setTotalRejectedPages] = useState(1);
  const itemsPerPage = 3; // Items per page
  const location = useLocation();
  //snacbar
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (location.state?.viewTab) {
      setActiveTab(location.state.viewTab); // tab active based on location state
    }

    fetchRetailers(page);
    fetchRejectedRetailers(page);
    fetchApprovedRetailers(page);
  }, [location.state?.viewRejected]);

  // Fetch Pending Retailers
  const fetchRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await getPendingRetailers(
        page,
        itemsPerPage
      );
      setPendingRetailer(data);
      setTotalPages(totalPages); // Set total pages for pending
    } catch (error) {
      console.error("Error fetching pending retailers:", error);
    }
  };

  // Fetch Approved Retailers
  const fetchApprovedRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await getApprovedRetailer(
        page,
        itemsPerPage
      );
      console.log(data);
      setApprovedRetailers(data);
      setTotalApprovedPages(totalPages);
    } catch (error) {
      console.error("Error fetching approved retailers:", error);
    }
  };

  // Fetch Rejected Retailers
  const fetchRejectedRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await getRejectedRetailer(
        page,
        itemsPerPage
      );
      setRejectedRetailers(data);
      setTotalRejectedPages(totalPages);
    } catch (error) {
      console.error("Error fetching rejected retailers:", error);
    }
  };

  // Approve, reject and trendy actions
  const handleApprove = async (retailerId: string) => {
    try {
      const res: ApiResponse = await approveRetailer(retailerId);
      // working on this
      await fetchRetailers(page);
      await fetchApprovedRetailers(approvedPage);
      await fetchRejectedRetailers(rejectedPage);

      //snacbar
      if (res.acknowledged === true) {
        setSnackbar({
          open: true,
          message: "Retailer approved successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Retailer approved failed",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error while approving",
        severity: "error",
      });
    }
  };

  const handleReject = async (retailerId: string) => {
    try {
      const res: ApiResponse = await rejectRetailer(retailerId);
      await fetchRetailers(page);
      await fetchApprovedRetailers(approvedPage);
      await fetchRejectedRetailers(rejectedPage);
      //snackbar
      if (res.acknowledged === true) {
        setSnackbar({
          open: true,
          message: "Retailer rejected successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Retailer rejection failed",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error while rejecting",
        severity: "error",
      });
    }
  };

  const handleTrendy = async (retailerId: string) => {
    try {
      const res: ApiResponse = await makeTrendy(retailerId);
      if (res.acknowledged === true) {
        setSnackbar({
          open: true,
          message: "Marked Trendy successfully.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Trendy marking failed",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error marking trendy",
        severity: "error",
      });
    }
  };
  // Dialog box model
  const openConfirmationModal = (
    pendingRetailer: Retailer,
    action: "approve" | "reject" | "trendy"
  ) => {
    console.log(action);
    setSelectedRetailer(pendingRetailer);
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
    } else if (actionType === "trendy") {
      handleTrendy(selectedRetailer._id);
    }
    closeConfirmationModal();
  };

  // pagination change
  const handleChangePage = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
    fetchRetailers(value);
  };

  const handleApprovedPageChange = (
    event: React.ChangeEvent<any>,
    value: number
  ) => {
    setApprovedPage(value);
    fetchApprovedRetailers(value);
  };

  const handleRejectedPageChange = (
    event: React.ChangeEvent<any>,
    value: number
  ) => {
    setRejectedPage(value);
    fetchRejectedRetailers(value);
  };

  const truncateAddress = (address: string) => {
    return address.length > 30 ? address.slice(0, 30) : address;
  };

  //snackbar close handle
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container sx={containerStyle}>
      <Box sx={buttonGroupStyle}>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("approved")} // Switch to approved retailers
            sx={{
              ...tabButtonStyle,
              backgroundColor:
                activeTab === "approved" ? "#e43e38" : "transparent", // red for approved
              color: activeTab === "approved" ? "#fff" : "primary.main",
              "&:hover": {
                backgroundColor:
                  activeTab === "approved" ? "#e43e38" : "transparent", // red on hover
              },
            }}
          >
            Approved Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("pending")} // Switch to pending retailers
            sx={{
              ...tabButtonStyle,
              backgroundColor:
                activeTab === "pending" ? "#e43e38" : "transparent",
              color: activeTab === "pending" ? "#fff" : "primary.main",
              "&:hover": {
                backgroundColor:
                  activeTab === "pending" ? "#e43e38" : "transparent",
              },
            }}
          >
            Pending Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("rejected")} //Switch to rejected retailers
            sx={{
              ...tabButtonStyle,
              backgroundColor:
                activeTab === "rejected" ? "#e43e38" : "transparent",
              color: activeTab === "rejected" ? "#fff" : "primary.main",
              "&:hover": {
                backgroundColor:
                  activeTab === "rejected" ? "#e43e38" : "transparent",
              },
            }}
          >
            Rejected Retailers
          </Button>
        </Box>
      </Box>

      {/* Actual screens */}
      {activeTab === "approved" && (
        <>
          <Box sx={cardContainerStyle}>
            {approvedRetailers.map((ret) => {
              const word = ret.role_specific_details?.approval[0]?.istrendy
                ? "(*Trendy*)"
                : "";
              return (
                <Box key={ret._id} sx={innerCardContainerStyle}>
                  <ActionCard
                    title={ret.username}
                    description={`Email: ${ret.email}`}
                    status={
                      ret.role_specific_details?.approval[0].approval_status
                    }
                    fields={[
                      {
                        label: "Contact",
                        value: `${ret.contact_number}${" "}${word}`,
                      },
                      { label: "Address", value: truncateAddress(ret.address) },
                    ]}
                  />
                </Box>
              );
            })}
          </Box>

          <Pagination
            count={totalApprovedPages}
            page={approvedPage}
            onChange={handleApprovedPageChange}
            variant="outlined"
            shape="rounded"
            sx={paginationStyle}
          />
        </>
      )}

      {activeTab === "rejected" && (
        <>
          <Box sx={cardContainerStyle}>
            {rejectedRetailers.map((ret) => (
              <Box key={ret._id} sx={innerCardContainerStyle}>
                <ActionCard
                  title={ret.username}
                  description={`Email: ${ret.email}`}
                  status={
                    ret.role_specific_details?.approval[0].approval_status
                  }
                  fields={[
                    { label: "Contact", value: ret.contact_number },
                    { label: "Address", value: truncateAddress(ret.address) },
                  ]}
                />
              </Box>
            ))}
          </Box>
          <Pagination
            count={totalRejectedPages}
            page={rejectedPage}
            onChange={handleRejectedPageChange}
            variant="outlined"
            shape="rounded"
            sx={paginationStyle}
          />
        </>
      )}

      {activeTab === "pending" && (
        <>
          <Box sx={cardContainerStyle}>
            {pendingRetailer.map((ret) => (
              <Box key={ret._id} sx={innerCardContainerStyle}>
                <ActionCard
                  title={ret.username}
                  description={`Email: ${ret.email}`}
                  status={
                    ret.role_specific_details?.approval[0].approval_status
                  }
                  fields={[
                    { label: "Contact", value: ret.contact_number },
                    { label: "Address", value: truncateAddress(ret.address) },
                  ]}
                  onApprove={() => openConfirmationModal(ret, "approve")}
                  onReject={() => openConfirmationModal(ret, "reject")}
                  onTrendy={() => openConfirmationModal(ret, "trendy")}
                />
              </Box>
            ))}
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={paginationStyle}
          />
        </>
      )}
      {/* Dialog box */}
      <Dialog
        open={openModal}
        onClose={closeConfirmationModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={modalTitle}>
          {actionType === "approve" ? (
            <CheckCircleOutlineIcon color="success" />
          ) : actionType === "reject" ? (
            <WarningAmberIcon color="warning" />
          ) : (
            <TrendingUpIcon color="primary" />
          )}
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Box sx={modalContent}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {actionType === "approve"
                ? "Are you sure you want to approve this retailer?"
                : actionType === "reject"
                ? "Are you sure you want to reject this retailer?"
                : actionType === "trendy"
                ? "Are you sure you want to mark this retailer as trendy?"
                : null}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {actionType === "approve"
                ? "This action is beneficial and will approve the retailer."
                : actionType === "reject"
                ? "This action is irreversible and will reject the retailer."
                : "This action will mark the retailer as trendy."}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={modalActions}>
          <Button
            onClick={closeConfirmationModal}
            color="inherit"
            variant="outlined"
            sx={modalButton}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            color={
              actionType === "approve"
                ? "success"
                : actionType === "reject"
                ? "warning"
                : "primary"
            }
            variant="contained"
            sx={modalButton}
          >
            {actionType === "approve"
              ? "Approve"
              : actionType === "reject"
              ? "Reject"
              : "Mark Trendy"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 5 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LandingPageAdminDashboard;
