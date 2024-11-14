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
  Grid2,
  TextField,
} from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import {
  approveRetailer,
  fetchRetailersWithPagination,
  rejectRetailer,
  searchRetailers,
} from "../../services/Retailer";
import { ActionCard } from "../../components/ActionCard";
import { useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { ApiResponse } from "./LandingPageAdminDashboard.types";
import { styles } from "./LandingPageAdminDashboard.styles";
import { RetailerInfoCard } from "../../components/RetailerInfoCard";
import noData from "../../assets/noReports.svg";
import { useSnackbar } from "../../hook";

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
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  //pagination
  const [page, setPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);
  const [rejectedPage, setRejectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApprovedPages, setTotalApprovedPages] = useState(1);
  const [totalRejectedPages, setTotalRejectedPages] = useState(1);
  // state for search term
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Retailer[]>([]);
  const itemsPerPage = 6; // Items per page
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

  // Fetch Retailers from one function
  const fetchRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await fetchRetailersWithPagination(
        "/api/admin/pendingRetailers",
        page,
        itemsPerPage
      );
      setPendingRetailer(data);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching pending retailers", "error");
    }
  };

  const fetchApprovedRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await fetchRetailersWithPagination(
        "/api/admin/getapprovedRetailers",
        page,
        itemsPerPage
      );
      setApprovedRetailers(data);
      setTotalApprovedPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching approved retailers", "error");
    }
  };

  const fetchRejectedRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await fetchRetailersWithPagination(
        "/api/admin/getrejectedRetailers",
        page,
        itemsPerPage
      );
      setRejectedRetailers(data);
      setTotalRejectedPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching rejected retailers", "error");
    }
  };

  // Approve, reject and trendy actions
  const handleApprove = async (retailerId: string) => {
    try {
      const res: ApiResponse = await approveRetailer(retailerId);
      await fetchRetailers(page);
      await fetchApprovedRetailers(approvedPage);
      await fetchRejectedRetailers(rejectedPage);

      if (res.acknowledged === true) {
        showSnackbar("Retailer approved successfully.", "success");
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
      if (res.acknowledged === true) {
        showSnackbar("Retailer rejected successfully.", "success");
      }
    } catch (error) {
      showSnackbar("Error while rejecting", "error");
    }
  };

  // Dialog box model
  const openConfirmationModal = (
    pendingRetailer: Retailer,
    action: "approve" | "reject"
  ) => {
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
    }
    closeConfirmationModal();
  };

  //handle search term change
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      fetchRetailers(page);
      fetchApprovedRetailers(approvedPage);
      fetchRejectedRetailers(rejectedPage);
      return;
    }

    try {
      const searchData = await searchRetailers(searchTerm);
      setSearchResults(searchData);
    } catch (error) {
      showSnackbar("Error while searching for retailers", "error");
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  return (
    <Container sx={styles.containerStyle}>
      <Grid2 container sx={styles.buttonGroupStyle}>
        <Grid2 size={{ sm: 2, xs: 4 }}>
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
        </Grid2>
        <Grid2 size={{ sm: 2, xs: 4 }}>
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
        </Grid2>
        <Grid2 size={{ sm: 2, xs: 4 }}>
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
        </Grid2>
        <Grid2
          size={{ sm: 6, xs: 12 }}
          sx={styles.searchStyle}
        >
          <TextField
            label="Search Retailers"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={styles.searchTermStyle}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>

      {/* If no data available */}
      <Box sx={styles.view}>
        {activeTab === "approved" && approvedRetailers.length === 0 && (
          <Box sx={{ textAlign: "center", marginY: "180px" }}>
            <img src={noData} alt="No Data" style={{ width: "60%" }} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No approved retailers available
            </Typography>
          </Box>
        )}

        {activeTab === "rejected" && rejectedRetailers.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 5, marginY: "180px" }}>
            <img src={noData} alt="No Data" style={{ width: "60%" }} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No rejected retailers available
            </Typography>
          </Box>
        )}

        {activeTab === "pending" && pendingRetailer.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 5, marginY: "180px" }}>
            <img src={noData} alt="No Data" style={{ width: "60%" }} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No pending retailers available
            </Typography>
          </Box>
        )}
        {/* Actual screens */}
        {activeTab === "approved" && (
          <>
            <Grid2 container size={12} sx={styles.content}>
              {approvedRetailers.map((ret) => {
                return (
                  <Grid2 key={ret._id} sx={styles.innerCardContainerStyle}>
                    <ActionCard
                      sx={styles.cardStyles}
                      imageUrl={ret.user_image}
                      imageStyles={styles.cardMediaStyles}
                    >
                      <RetailerInfoCard retailer={ret} />
                    </ActionCard>
                  </Grid2>
                );
              })}
            </Grid2>
            {approvedRetailers.length > 0 && (
              <Pagination
                count={totalApprovedPages}
                page={approvedPage}
                onChange={handleApprovedPageChange}
                variant="outlined"
                shape="rounded"
                sx={styles.paginationStyle}
              />
            )}
          </>
        )}

        {activeTab === "rejected" && (
          <>
            <Grid2 container size={12}>
              {rejectedRetailers.map((ret) => {
                return (
                  <Box key={ret._id} sx={styles.innerCardContainerStyle}>
                    <ActionCard
                      sx={styles.cardStyles}
                      imageUrl={ret.user_image!}
                      imageStyles={styles.cardMediaStyles}
                    >
                      <RetailerInfoCard retailer={ret} />
                    </ActionCard>
                  </Box>
                );
              })}
            </Grid2>
            {rejectedRetailers.length > 0 && (
              <Pagination
                count={totalRejectedPages}
                page={rejectedPage}
                onChange={handleRejectedPageChange}
                variant="outlined"
                shape="rounded"
                sx={styles.paginationStyle}
              />
            )}
          </>
        )}

        {activeTab === "pending" && (
          <>
            <Grid2 container size={12} sx={{ justifyContent: "center" }}>
              {pendingRetailer.map((ret) => (
                <Box key={ret._id} sx={styles.innerCardContainerStyle}>
                  <ActionCard
                    sx={styles.cardStyles}
                    imageUrl={ret.user_image!}
                    imageStyles={styles.cardMediaStyles}
                  >
                    <RetailerInfoCard
                      retailer={ret}
                      showButtons={true}
                      onApprove={() => openConfirmationModal(ret, "approve")}
                      onReject={() => openConfirmationModal(ret, "reject")}
                    />
                  </ActionCard>
                </Box>
              ))}
            </Grid2>
            {pendingRetailer.length > 0 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                sx={styles.paginationStyle}
              />
            )}
          </>
        )}
      </Box>
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
          ) : (
            <WarningAmberIcon color="warning" />
          )}
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.modalContent}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              {actionType === "approve"
                ? "Are you sure you want to approve this retailer?"
                : "Are you sure you want to reject this retailer?"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {actionType === "approve"
                ? "This action will approve the retailer and allow them to proceed."
                : "This action is irreversible and will reject the retailer."}
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
            color={actionType === "approve" ? "success" : "primary"}
            variant="contained"
            sx={styles.modalButton}
          >
            {actionType === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LandingPageAdminDashboard;
