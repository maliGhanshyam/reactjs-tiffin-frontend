import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Button,
  Grid2,
  TextField,
} from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import {
  approveRetailer,
  fetchRetailersWithPagination,
  rejectRetailer,
  searchRetailerWithStatus,
} from "../../services/Retailer";
import { ActionCard } from "../../components/ActionCard";
import { useLocation } from "react-router-dom";
import { ApiResponse } from "./LandingPageAdminDashboard.types";
import { styles } from "./LandingPageAdminDashboard.styles";
import { RetailerInfoCard } from "../../components/RetailerInfoCard";
import { useSnackbar } from "../../hook";
import noData from "../../assets/noReports.svg";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import RetailerCard from "../../components/RetailerCard/RetailerCard";

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
  const itemsPerPage = 8; // Items per page
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  const fetchRetailersData = async () => {
    await fetchRetailers(page);
    await fetchApprovedRetailers(approvedPage);
    await fetchRejectedRetailers(rejectedPage);
  };

  useEffect(() => {
    if (location.state?.viewTab) {
      setActiveTab(location.state.viewTab); // tab active based on location state
    }
    if (searchTerm.trim() === "") {
      fetchRetailersData();
    }
  }, [location.state?.viewRejected, page]);

  // Fetch Retailers from one function
  const fetchRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await fetchRetailersWithPagination(
        "pendingRetailers",
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
        "getapprovedRetailers",
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
        "getrejectedRetailers",
        page,
        itemsPerPage
      );
      setRejectedRetailers(data);
      setTotalRejectedPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching rejected retailers", "error");
    }
  };

  // Handle approve, reject and trendy actions
  const handleAction = async (
    retailerId: string,
    action: "approve" | "reject",
    successMessage: string
  ) => {
    try {
      const res: ApiResponse =
        action === "approve"
          ? await approveRetailer(retailerId)
          : await rejectRetailer(retailerId);
      await fetchRetailersData();

      if (res.acknowledged === true) {
        showSnackbar(successMessage, "success");
      }
    } catch (error) {
      showSnackbar(
        `Error while ${action === "approve" ? "approving" : "rejecting"}.`,
        "error"
      );
    }
  };
  const handleApprove = async (retailerId: string) => {
    handleAction(retailerId, "approve", "Retailer approved sucessfully");
  };
  const handleReject = async (retailerId: string) => {
    handleAction(retailerId, "reject", "Retailer rejected successfully.");
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
  //All handle change event
  //handle search term change
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      fetchRetailersData();
      return;
    }
    try {
      setPage(1);
      setApprovedPage(1);
      setRejectedPage(1);
      const searchData = await searchRetailerWithStatus(searchTerm, activeTab);
      if (searchData.length === 0) {
        showSnackbar(
          "No retailers found matching the search criteria.",
          "success"
        );
      }
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
    <Box sx={styles.containerStyle}>
      <Grid2 container sx={styles.buttonGroupStyle}>
        <Grid2 size={{ sm: 6, xs: 12 }} sx={{ justifyContent: "flex-start" }}>
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
        </Grid2>
        <Grid2 size={{ sm: 6, xs: 12 }} sx={styles.searchStyle}>
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
      {/* Actual screens */}
      {searchResults.length > 0
        ? searchResults.map((ret) => (
            <Grid2 key={ret._id} sx={styles.innerCardContainerStyle}>
              <ActionCard
                sx={styles.cardStyles}
                imageUrl={ret.user_image}
                imageStyles={styles.cardMediaStyles}
              >
                <RetailerInfoCard retailer={ret} />
              </ActionCard>
            </Grid2>
          ))
        : activeTab === "approved" && (
          <>
            <Grid2 container size={12} sx={styles.content}>
              {approvedRetailers.map((ret) => {
                return (
                  <RetailerCard retailer={ret} />
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

      {searchResults.length > 0 ? (
        <Grid2 container size={12} sx={styles.content}>
          {searchResults.map((ret) => (
            <Grid2 key={ret._id} sx={styles.innerCardContainerStyle}>
              <ActionCard
                sx={styles.cardStyles}
                imageUrl={ret.user_image}
                imageStyles={styles.cardMediaStyles}
              >
                <RetailerInfoCard retailer={ret} />
              </ActionCard>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        activeTab === "rejected" && (
          <>
            <Grid2 container size={12} sx={styles.content}>
              {rejectedRetailers.map((ret) => {
                return (
                  <RetailerCard retailer={ret} />
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
        )
      )}

      {searchResults.length > 0 ? (
        searchResults.map((ret) => (
          <Box key={ret._id} sx={styles.innerCardContainerStyle}>
            <ActionCard
              sx={styles.cardStyles}
              imageUrl={ret.user_image}
              imageStyles={styles.cardMediaStyles}
            >
              <RetailerInfoCard retailer={ret} />
            </ActionCard>
          </Box>
        ))
      ) : activeTab === "pending" && pendingRetailer.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5, marginY: "180px" }}>
          <img src={noData} alt="No Data" style={{ width: "60%" }} />
          <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
            No pending retailers available
          </Typography>
        </Box>
      ) : (
        activeTab === "pending" && (
          <>
            <Grid2 container size={12} sx={styles.content}>
              {pendingRetailer.map((ret) => (
                <RetailerCard
                  retailer={ret}
                  showButtons={true}
                  onApprove={() => openConfirmationModal(ret, "approve")}
                  onReject={() => openConfirmationModal(ret, "reject")}
                />
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
        )
      )}
      {/* Dialog box */}
      <ConfirmationDialog
        open={openModal}
        onClose={closeConfirmationModal}
        onConfirm={confirmAction}
        title={
          actionType === "approve" ? "Confirm Approval" : "Confirm Rejection"
        }
        content={
          actionType === "approve"
            ? "Are you sure you want to approve this retailer?"
            : "Are you sure you want to reject this retailer?"
        }
        actionType={actionType}
      />
    </Box>
  );
};

export default LandingPageAdminDashboard;
