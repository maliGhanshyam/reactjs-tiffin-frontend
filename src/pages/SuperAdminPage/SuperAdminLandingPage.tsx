import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import OrganisationCard from "../../components/OrganisationCardComp/OrganisationCard";
import {
  getPendingAdmins,
  getOrganizations,
  getApprovedAdmins,
  getRejectedAdmins,
  approveAdmin,
  rejectAdmin,
  deleteOrganization,
} from "../../services/OrganisationService/OrganizationService";
import { subTitleStyles as titleStyles } from "../../components/OrganisationCardComp/OrganisationCardStyles";
import { Organization, UserData } from "../../Types";

const SuperAdminLandingPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<UserData[]>([]);
  const [approvedAdmins, setApprovedAdmins] = useState<UserData[]>([]);
  const [rejectedAdmins, setRejectedAdmins] = useState<UserData[]>([]);
  const [currentTab, setCurrentTab] = useState<
    "pending" | "approved" | "rejected" | "available"
  >("pending");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(16);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    const fetchPendingAdmins = async () => {
      try {
        const data = await getPendingAdmins();
        setPendingAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    const fetchApprovedAdmins = async () => {
      try {
        const data = await getApprovedAdmins();
        setApprovedAdmins(data);
      } catch (error) {
        console.error("Error fetching Approved admins:", error);
      }
    };
    const fetchRejectedAdmins = async () => {
      try {
        const data = await getRejectedAdmins();
        console.log("rejected", data);
        setRejectedAdmins(data);
      } catch (error) {
        console.error("Error fetching Rejected admins:", error);
      }
    };

    fetchOrganizations();
    fetchPendingAdmins();
    fetchApprovedAdmins();
    fetchRejectedAdmins();
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "pending" | "approved" | "rejected" | "available"
  ) => {
    setCurrentTab(newValue);
    setPage(1); // Reset page when tab changes
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const handleApprove = async (id: string) => {
    try {
      await approveAdmin(id); // Assuming approveAdmin sends a request with _id as a param
      console.log("From Page Approved admin with ID:", id);
      // Optionally, update the UI after approval
    } catch (error) {
      console.error("Error approving admin:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectAdmin(id); // Assuming rejectAdmin sends a request with _id as a param
      console.log("Rejected admin with ID:", id);
      // Optionally, update the UI after rejection
    } catch (error) {
      console.error("Error rejecting admin:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrganization(id); // Assuming rejectAdmin sends a request with _id as a param
      console.log("Rejected admin with ID:", id);
      // Optionally, update the UI after rejection
    } catch (error) {
      console.error("Error rejecting admin:", error);
    }
  };

  // Determine what data to display based on the currentTab
  let displayData: (UserData | Organization)[] = [];
  switch (currentTab) {
    case "pending":
      displayData = pendingAdmins;
      break;
    case "approved":
      displayData = approvedAdmins;
      break;
    case "rejected":
      displayData = rejectedAdmins;
      break;
    case "available":
      displayData = organizations;
      break;
    default:
      displayData = [];
  }

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = displayData.slice(startIndex, endIndex);

  const isUserData = (item: Organization | UserData): item is UserData => {
    return (item as UserData).username !== undefined;
  };

  const isOrganization = (
    item: Organization | UserData
  ): item is Organization => {
    return (item as Organization).org_name !== undefined;
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 2 }}>
        <Tabs value={currentTab} sx={titleStyles} onChange={handleTabChange}>
          <Tab label="Pending Admins" value="pending" sx={titleStyles} />
          <Tab label="Approved Admins" value="approved" sx={titleStyles} />
          <Tab label="Rejected Admins" value="rejected" sx={titleStyles} />
          <Tab label="Organizations" value="available" sx={titleStyles} />
        </Tabs>
        {/* Scrollable Card Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
            py: 2,
          }}
        >
          {displayedData.map((item) => (
            <Box key={item._id} sx={{ m: 1, width: "calc(25% - 16px)" }}>
              {isUserData(item) ? (
                <OrganisationCard
                  title={item.username}
                  description=""
                  image="https://picsum.photos/200/300/?blur"
                  fields={[
                    {
                      label: "Organization",
                      value: item.role_specific_details.organization_name,
                    },
                    { label: "Location", value: item.address },
                  ]}
                  status={item.role_specific_details.approval_status}
                  actions={[
                    {
                      label: "Approve",
                      color: "primary",
                      onClick: () => handleApprove(item._id),
                    },
                    {
                      label: "Reject",
                      color: "error",
                      onClick: () => handleReject(item._id),
                    },
                  ]}
                />
              ) : (
                <OrganisationCard
                  title={item.org_name}
                  description=""
                  image="https://picsum.photos/200/300/?blur"
                  fields={item.org_location.map((loc, index) => ({
                    label: `Location ${index + 1}`,
                    value: loc.loc,
                  }))}
                  status={item.isActive ? "Active" : "Inactive"}
                  actions={[
                    {
                      label: "Update",
                      color: "primary",
                      onClick: () => console.log("Update"),
                    },
                    {
                      label: "Delete",
                      color: "error",
                      onClick: () => handleDelete(item._id),
                    },
                  ]}
                />
              )}
            </Box>
          ))}
        </Box>
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
          <Pagination
            count={Math.ceil(displayData.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SuperAdminLandingPage;
