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
  CardActions,
  Grid2,
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ApiResponse } from "./LandingPageAdminDashboard.types";
import { styles } from "./LandingPageAdminDashboard.styles";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useSnackbar } from "../../context/SnackbarProvider";

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
  const { showSnackbar } = useSnackbar();

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
      showSnackbar("Error fetching pending retailers", "error");
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
      showSnackbar("Error fetching approved retailers", "error");
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
      showSnackbar("Error fetching rejected retailers", "error");
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

      if (res.acknowledged === true) {
        showSnackbar("Retailer approved successfully.", "success");
      } else {
        showSnackbar("Retailer approval failed.", "error");
      }
    } catch (error) {
      showSnackbar("Error while approving.", "error");
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
        showSnackbar("Retailer rejected successfully.", "success");
      } else {
        showSnackbar("Retailer rejection failed", "error");
      }
    } catch (error) {
      showSnackbar("Error while rejecting", "error");
    }
  };

  const handleTrendy = async (retailerId: string) => {
    try {
      const res: ApiResponse = await makeTrendy(retailerId);
      await fetchRetailers(page);
      await fetchApprovedRetailers(approvedPage);
      await fetchRejectedRetailers(rejectedPage);
      if (res.acknowledged === true) {
        showSnackbar("Marked Trendy successfully.", "success");
      } else {
        showSnackbar("Trendy marking failed.", "error");
      }
    } catch (error) {
      showSnackbar("Error marking trendy", "error");
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

  return (
    <Container sx={styles.containerStyle}>
      <Box sx={styles.buttonGroupStyle}>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("approved")} // Switch to approved retailers
            sx={{
              ...(activeTab === "approved"
                ? styles.activeButton
                : styles.inactiveButton),
            }}
          >
            Approved Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("pending")} // Switch to pending retailers
            sx={{
              ...(activeTab === "pending"
                ? styles.activeButton
                : styles.inactiveButton),
            }}
          >
            Pending Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("rejected")} //Switch to rejected retailers
            sx={{
              ...(activeTab === "rejected"
                ? styles.activeButton
                : styles.inactiveButton),
            }}
          >
            Rejected Retailers
          </Button>
        </Box>
      </Box>

      {/* Actual screens */}
      {activeTab === "approved" && (
        <>
          <Box sx={styles.cardContainerStyle}>
            {approvedRetailers.map((ret) => {
              const word = ret.role_specific_details?.approval[0]?.istrendy
                ? "(*Trendy*)"
                : "";
              return (
                <Grid2 key={ret._id} sx={styles.innerCardContainerStyle}>
                  <ActionCard
                    sx={styles.cardStyles}
                    imageUrl="https://via.placeholder.com/400x320"
                    imageStyles={styles.cardMediaStyles}
                  >
                    <Typography variant="h6" sx={styles.titleStyles}>
                      {ret.username}
                      {ret.role_specific_details?.approval[0]?.istrendy && (
                        <LocalFireDepartmentIcon
                          sx={{ color: "orange", ml: 1 }}
                        />
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.descriptionStyles}
                    >{`Email: ${ret.email}`}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
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

                    {/* Dynamic Fields */}
                    <Box sx={styles.fieldsBoxStyles}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Contact:</strong> {ret.contact_number} {word}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Address:</strong> {truncateAddress(ret.address)}
                      </Typography>
                    </Box>
                  </ActionCard>
                </Grid2>
              );
            })}
          </Box>

          <Pagination
            count={totalApprovedPages}
            page={approvedPage}
            onChange={handleApprovedPageChange}
            variant="outlined"
            shape="rounded"
            sx={styles.paginationStyle}
          />
        </>
      )}

      {activeTab === "rejected" && (
        <>
          <Box sx={styles.cardContainerStyle}>
            {rejectedRetailers.map((ret) => {
              const word = ret.role_specific_details?.approval[0]?.istrendy
                ? "(*Trendy*)"
                : "";
              return (
                <Box key={ret._id} sx={styles.innerCardContainerStyle}>
                  <ActionCard
                    sx={styles.cardStyles}
                    imageUrl="https://via.placeholder.com/400x320"
                    imageStyles={styles.cardMediaStyles}
                  >
                    <Typography variant="h6" sx={styles.titleStyles}>
                      {ret.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={styles.descriptionStyles}
                    >{`Email: ${ret.email}`}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontWeight: 500,
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

                    {/* Dynamic Fields */}
                    <Box sx={styles.fieldsBoxStyles}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Contact:</strong> {ret.contact_number} {word}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Address:</strong> {truncateAddress(ret.address)}
                      </Typography>
                    </Box>
                  </ActionCard>
                </Box>
              );
            })}
          </Box>

          <Pagination
            count={totalRejectedPages}
            page={rejectedPage}
            onChange={handleRejectedPageChange}
            variant="outlined"
            shape="rounded"
            sx={styles.paginationStyle}
          />
        </>
      )}

      {activeTab === "pending" && (
        <>
          <Box sx={styles.cardContainerStyle}>
            {pendingRetailer.map((ret) => (
              <Box key={ret._id} sx={styles.innerCardContainerStyle}>
                <ActionCard
                  sx={styles.cardStyles}
                  imageUrl="https://via.placeholder.com/400x320"
                  imageStyles={styles.cardMediaStyles}
                >
                  <Typography variant="h6" sx={styles.titleStyles}>
                    {ret.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={styles.descriptionStyles}
                  >{`Email: ${ret.email}`}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      fontWeight: 500,
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
                  <CardActions sx={styles.cardActionsStyles}>
                    <Button
                      onClick={() => openConfirmationModal(ret, "approve")}
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleOutlineIcon />}
                      sx={styles.buttonStyles}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => openConfirmationModal(ret, "reject")}
                      size="small"
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={styles.rejectButtonStyles}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => openConfirmationModal(ret, "trendy")}
                      size="small"
                      variant="contained"
                      color="warning"
                      startIcon={<LocalFireDepartmentIcon />}
                      sx={styles.trendyButtonStyles}
                    >
                      Trendy
                    </Button>
                  </CardActions>
                </ActionCard>
              </Box>
            ))}
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={styles.paginationStyle}
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
        <DialogTitle sx={styles.modalTitle}>
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
          <Box sx={styles.modalContent}>
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
        <DialogActions sx={styles.modalActions}>
          <Button
            onClick={closeConfirmationModal}
            color="inherit"
            variant="outlined"
            sx={styles.modalButton}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            color={
              actionType === "approve"
                ? "success"
                : actionType === "reject"
                  ? "primary"
                  : "warning"
            }
            variant="contained"
            sx={styles.modalButton}
          >
            {actionType === "approve"
              ? "Approve"
              : actionType === "reject"
                ? "Reject"
                : "Mark Trendy"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LandingPageAdminDashboard;
