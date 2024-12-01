import { useEffect, useState } from "react";
import { Box, Button, Grid2, TextField, InputAdornment } from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import {
  approveRetailer,
  fetchRetailersWithPagination,
  rejectRetailer,
  searchRetailerWithStatus,
} from "../../services/Retailer";
import { useLocation } from "react-router-dom";
import { ApiResponse} from "./LandingPageAdminDashboard.types";
import {
  getButtonStyles,
  noDataImgStyle,
  styles,
} from "./LandingPageAdminDashboard.styles";
import { useSnackbar } from "../../hook";
import noData from "../../assets/noReports.svg";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import RetailerCard from "../../components/RetailerCard/RetailerCard";
import { NoData } from "../../components/NoData";
import SearchIcon from "@mui/icons-material/Search";
import { PaginationComponent } from "../../components/PaginationComponent";

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

  const fetchRetailersData = async (page: number) => {
    switch (activeTab) {
      case "pending":
        await fetchRetailers(page);
        break;
      case "approved":
        await fetchApprovedRetailers(approvedPage);
        break;
      case "rejected":
        await fetchRejectedRetailers(rejectedPage);
        break;
    }
  };

  useEffect(() => {
    if (location.state?.viewTab) {
      setActiveTab(location.state.viewTab); // tab active based on location state
    }
    setSearchTerm("");
    setSearchResults([]);
    fetchRetailersData(1);
  }, [location.state?.viewRejected]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      fetchRetailersData(page);
    } else {
      handleSearch();
    }
  }, [searchTerm, activeTab, page]);
  // Fetch Retailers
  const fetchRetailers = async (page: number) => {
    try {
      const { data, totalPages } = await fetchRetailersWithPagination(
        "pendingRetailers",
        page,
        itemsPerPage
      );
      setPendingRetailer(data);
      setTotalPages(totalPages);
    } catch (error:any) {
      (error.status === 401)?
      showSnackbar("Admin has not been approved yet.", "success"):
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
    } catch (error:any) {
      (error.status === 401)?
      showSnackbar("Admin has not been approved yet.", "success"):
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
    } catch (error:any) {
      (error.status === 401)?
      showSnackbar("Admin has not been approved yet.", "success"):
      showSnackbar("Error fetching rejected retailers", "error");
    }
  };

  // Handle approve, reject and trendy actions
  const handleAction = async (
    retailerId: string,
    action: "approve" | "reject",
    successMessage: string,
    rejectionReason?: string
  ) => {
    try {
      const res: ApiResponse =
        action === "approve"
          ? await approveRetailer(retailerId)
          : await rejectRetailer(retailerId, rejectionReason);
      await fetchRetailersData(page);

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
    console.log("a");
    handleAction(retailerId, "approve", "Retailer approved sucessfully");
  };
  const handleReject = async (retailerId: string, rejectionReason: string) => {
    handleAction(
      retailerId,
      "reject",
      "Retailer rejected successfully.",
      rejectionReason
    );
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
    setTimeout(() => {
      setSelectedRetailer(null);
      setActionType(null);
    }, 300);
  };

  const confirmAction = (rejectionReason?: string | undefined) => {
    if (!selectedRetailer || !actionType) return;
    if (actionType === "approve") {
      console.log("app");
      handleApprove(selectedRetailer._id);
    } else if (actionType === "reject" && rejectionReason) {
      handleReject(selectedRetailer._id, rejectionReason);
    }
    closeConfirmationModal();
  };
  //All handle change event
  //handle search term change
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      fetchRetailersData(page);
      return;
    }
    try {
      setPage(1);
      setApprovedPage(1);
      setRejectedPage(1);
      const searchData = await searchRetailerWithStatus(searchTerm, activeTab);
      if (searchData.length === 0) {
        setSearchResults([]);
        showSnackbar(
          "No retailers found matching the search criteria.",
          "success"
        );
      }
      setSearchResults(searchData);
    } catch (error) {
      showSnackbar("No such retailer found", "error");
      setSearchResults([]);
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
      <Grid2 sx={styles.buttonGroupStyle}>
        <Grid2 size={{ sm: 8, xs: 12 }} sx={styles.gridButtonGroup}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("approved")} // Switch to approved retailers
            sx={getButtonStyles("approved", activeTab, styles)}
          >
            Approved Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("pending")} // Switch to pending retailers
            sx={getButtonStyles("pending", activeTab, styles)}
          >
            Pending Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("rejected")} // Switch to rejected retailers
            sx={getButtonStyles("rejected", activeTab, styles)}
          >
            Rejected Retailers
          </Button>
        </Grid2>
        <Grid2 size={{ sm: 4, xs: 12 }} sx={styles.searchStyle}>
          <TextField
            label="Search Retailers"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={styles.searchTermStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid2>
      </Grid2>
      {/* Actual screens for search,pending,rejected,approved and Nodata found for retailers*/}
      {searchTerm.trim() !== "" && searchResults.length === 0 ? (
        <NoData
          message={"No such retailers available"}
          image={noData}
          boxStyle={styles.noDataBox}
          imgStyle={noDataImgStyle}
        />
      ) : searchResults.length > 0 ? (
        <Grid2 container size={12} sx={styles.content}>
          {searchResults.map((ret) => {
            const approvalStatus =
              ret.role_specific_details?.approval?.[0]?.approval_status;
            if (approvalStatus === "pending") {
              return (
                <RetailerCard
                  retailer={ret}
                  showButtons={true}
                  onApprove={() => openConfirmationModal(ret, "approve")}
                  onReject={() => openConfirmationModal(ret, "reject")}
                />
              );
            } else {
              return <RetailerCard retailer={ret} />;
            }
          })}
        </Grid2>
      ) : (
        <>
          {activeTab === "approved" && approvedRetailers.length === 0 ? (
            <NoData
              message={"No approved retailers available"}
              image={noData}
              boxStyle={styles.noDataBox}
              imgStyle={noDataImgStyle}
            />
          ) : (
            activeTab === "approved" && (
              <>
                <Grid2 container size={12} sx={styles.content}>
                  {approvedRetailers.map((ret) => {
                    return <RetailerCard retailer={ret} />;
                  })}
                </Grid2>
                {approvedRetailers.length > 0 && (
                  <PaginationComponent
                    count={totalApprovedPages}
                    page={approvedPage}
                    onChange={handleApprovedPageChange}
                  />
                )}
              </>
            )
          )}
          {activeTab === "rejected" && rejectedRetailers.length === 0 ? (
            <NoData
              message={"No rejected retailers available"}
              image={noData}
              boxStyle={styles.noDataBox}
              imgStyle={noDataImgStyle}
            />
          ) : (
            activeTab === "rejected" && (
              <>
                <Grid2 container size={12} sx={styles.content}>
                  {rejectedRetailers.map((ret) => {
                    return <RetailerCard retailer={ret} />;
                  })}
                </Grid2>
                {rejectedRetailers.length > 0 && (
                  <PaginationComponent
                    count={totalRejectedPages}
                    page={rejectedPage}
                    onChange={handleRejectedPageChange}
                  />
                )}
              </>
            )
          )}
          {activeTab === "pending" && pendingRetailer.length === 0 ? (
            <NoData
              message={"No pending retailers available"}
              image={noData}
              boxStyle={styles.noDataBox}
              imgStyle={noDataImgStyle}
            />
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
                  <PaginationComponent
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                )}
              </>
            )
          )}
        </>
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
