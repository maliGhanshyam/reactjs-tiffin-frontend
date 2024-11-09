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
} from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import {
  approveRetailer,
  getApprovedRetailer,
  getPendingRetailers,
  getRejectedRetailer,
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
  modalContentStyle,
  paginationStyle,
  tabButtonStyle,
  titleStyle,
} from "./LandingPageAdminDashboard.styles";

const LandingPageAdminDashboard = () => {
  const [pendingRetailer, setPendingRetailer] = useState<Retailer[]>([]);
  const [approvedRetailers, setApprovedRetailers] = useState<Retailer[]>([]);
  const [rejectedRetailers, setRejectedRetailers] = useState<Retailer[]>([]);
  const [activeTab, setActiveTab] = useState<string>("approved"); // Default to "approved"
  const [openModal, setOpenModal] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(
    null
  );
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
  const itemsPerPage = 3; // Items per page
  const location = useLocation();

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
      setTotalPages(Math.ceil(totalPages / itemsPerPage)); // Set total pages for pending
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
      setApprovedRetailers(data);
      setTotalApprovedPages(Math.ceil(totalPages / itemsPerPage));
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

  const handleApprove = async (retailerId: string) => {
    try {
      await approveRetailer(retailerId);
      // working on this
      // await fetchRetailers();
      // await fetchApprovedRetailers();
      // await fetchRejectedRetailers();
    } catch (error) {
      console.error("Error approving pendingRetailer:", error);
    }
  };

  const handleReject = async (retailerId: string) => {
    try {
      await rejectRetailer(retailerId);
      // await fetchRetailers();
      // await fetchApprovedRetailers();
      // await fetchRejectedRetailers();
    } catch (error) {
      console.error("Error rejecting pendingRetailer:", error);
    }
  };

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
    <Container sx={containerStyle}>
      <Box sx={buttonGroupStyle}>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("approved")} // Switch to approved retailers
            sx={tabButtonStyle}
          >
            Approved Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("pending")} // Switch to pending retailers
            sx={tabButtonStyle}
          >
            Pending Retailers
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setActiveTab("rejected")} //Switch to rejected retailers
            sx={tabButtonStyle}
          >
            Rejected Retailers
          </Button>
        </Box>
      </Box>

      {activeTab === "approved" && (
        <>
          <Typography variant="h5" sx={titleStyle}>
            Approved Retailers
          </Typography>
          <Box sx={cardContainerStyle}>
            {approvedRetailers.map((ret) => (
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
          <Typography variant="h5" sx={titleStyle}>
            Rejected Retailers
          </Typography>
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
          <Typography variant="h5" sx={titleStyle}>
            Pending Retailers
          </Typography>
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
      <Dialog open={openModal} onClose={closeConfirmationModal}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={modalContentStyle}>
            Are you sure you want to{" "}
            {actionType === "approve" ? "approve" : "reject"} this
            pendingRetailer?
          </Typography>
        </DialogContent>
        <DialogActions sx={dialogActionsStyle}>
          <Button onClick={closeConfirmationModal} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LandingPageAdminDashboard;
