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
import OrganisationCardStyles from "../../components/OrganisationCardComp/OrganisationCardStyles";
import { Organization, UserData } from "../../Types";
import { useNavigate } from "react-router-dom";

// Define the action type
type ActionType = {
  label: string;
  color: "primary" | "error";
  onClick: () => void;
};

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
  const navigate = useNavigate();

  const fetchAllData = async () => {
    try {
      const [orgsData, pendingData, approvedData, rejectedData] =
        await Promise.all([
          getOrganizations(),
          getPendingAdmins(),
          getApprovedAdmins(),
          getRejectedAdmins(),
        ]);

      setOrganizations(orgsData);
      setPendingAdmins(pendingData);
      setApprovedAdmins(approvedData);
      setRejectedAdmins(rejectedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "pending" | "approved" | "rejected" | "available"
  ) => {
    setCurrentTab(newValue);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleApprove = async (id: string) => {
    try {
      await approveAdmin(id);
      await fetchAllData();
    } catch (error) {
      console.error("Error approving admin:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectAdmin(id);
      await fetchAllData();
    } catch (error) {
      console.error("Error rejecting admin:", error);
    }
  };

  const handleUpdate = (id: string) => {
    navigate(`/editOrganization/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrganization(id);
      await fetchAllData();
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

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

  const getActions = (item: Organization | UserData): ActionType[] => {
    if (isOrganization(item)) {
      return [
        {
          label: "Update",
          color: "primary",
          onClick: () => handleUpdate(item._id),
        },
        {
          label: "Delete",
          color: "error" as const,
          onClick: () => handleDelete(item._id),
        },
      ];
    }

    if (currentTab === "pending") {
      return [
        {
          label: "Approve",
          color: "primary" as const,
          onClick: () => handleApprove(item._id),
        },
        {
          label: "Reject",
          color: "error" as const,
          onClick: () => handleReject(item._id),
        },
      ];
    }

    return [];
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 2 }}>
        <Tabs
          value={currentTab}
          sx={OrganisationCardStyles.subTitleStyles}
          onChange={handleTabChange}
        >
          <Tab
            label="Pending Admins"
            value="pending"
            sx={OrganisationCardStyles.subTitleStyles}
          />
          <Tab
            label="Approved Admins"
            value="approved"
            sx={OrganisationCardStyles.subTitleStyles}
          />
          <Tab
            label="Rejected Admins"
            value="rejected"
            sx={OrganisationCardStyles.subTitleStyles}
          />
          <Tab
            label="Organizations"
            value="available"
            sx={OrganisationCardStyles.subTitleStyles}
          />
        </Tabs>
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
                  actions={getActions(item)}
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
                  actions={getActions(item)}
                />
              )}
            </Box>
          ))}
        </Box>
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
