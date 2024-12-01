import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import OrganisationCard from "../../components/OrganisationCardComp/OrganisationCard";
import {
  getAdminRequests,
  getOrganizations,
  approveAdmin,
  rejectAdmin,
  deleteOrganization,
} from "../../services/OrganisationService/OrganizationService";
import OrganisationCardStyles from "../../components/OrganisationCardComp/OrganisationCardStyles";
import { Organization, UserData } from "../../Types";
import { useNavigate } from "react-router-dom";
import { NoData } from "../../components/NoData";
import noData from "../../assets/noTask.svg";
import { styles } from "./SuperAdminLandingPage.styles";

// Define the action type
type ActionType = {
  label: string;
  color: "primary" | "error";
  onClick: () => void;
};

interface PaginationState {
  pending: { page: number; totalPages: number; totalItems: number };
  approved: { page: number; totalPages: number; totalItems: number };
  rejected: { page: number; totalPages: number; totalItems: number };
}

const SuperAdminLandingPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<UserData[]>([]);
  const [approvedAdmins, setApprovedAdmins] = useState<UserData[]>([]);
  const [rejectedAdmins, setRejectedAdmins] = useState<UserData[]>([]);
  const [currentTab, setCurrentTab] = useState<
    "pending" | "approved" | "rejected" | "available"
  >("pending");
  const [rowsPerPage, setRowsPerPage] = useState<number>(16);
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pending: { page: 1, totalPages: 1, totalItems: 0 },
    approved: { page: 1, totalPages: 1, totalItems: 0 },
    rejected: { page: 1, totalPages: 1, totalItems: 0 },
  });

  const getAlllData = async () => {
    try {
      const statuses = ["pending", "approved", "rejected"];
      const results = await Promise.all(
        statuses.map(async (status) => {
          const currentPage =
            paginationState[status as keyof PaginationState].page;
          console.log(`Fetching ${status} data for page ${currentPage}`); // Debug log
          const { data, pagination } = await getAdminRequests(
            status,
            currentPage,
            rowsPerPage
          );
          console.log(`${status} response:`, { data, pagination }); // Debug log
          return {
            status,
            data,
            totalItems: pagination.totalItems,
            totalPages: Math.ceil(pagination.totalPages),
          };
        })
      );

      results.forEach(({ status, data, totalItems, totalPages }) => {
        switch (status) {
          case "pending":
            setPendingAdmins(data);
            setPaginationState((prev) => ({
              ...prev,
              pending: {
                ...prev.pending,
                totalItems,
                totalPages,
                page: prev.pending.page, // Maintain current page
              },
            }));
            break;
          case "approved":
            setApprovedAdmins(data);
            setPaginationState((prev) => ({
              ...prev,
              approved: {
                ...prev.approved,
                totalItems,
                totalPages,
                page: prev.approved.page, // Maintain current page
              },
            }));
            break;
          case "rejected":
            setRejectedAdmins(data);
            setPaginationState((prev) => ({
              ...prev,
              rejected: {
                ...prev.rejected,
                totalItems,
                totalPages,
                page: prev.rejected.page, // Maintain current page
              },
            }));
            break;
        }
      });
    } catch (error) {
      console.error("Error fetching admins by status:", error);
    }
  };

  const fetchAllData = async () => {
    try {
      const [orgsData] = await Promise.all([getOrganizations()]);
      setOrganizations(orgsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Pagination state changed:", paginationState); // Debug log
    fetchAllData();
    getAlllData();
  }, [
    paginationState.pending.page,
    paginationState.approved.page,
    paginationState.rejected.page,
    rowsPerPage,
  ]);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "pending" | "approved" | "rejected" | "available"
  ) => {
    setCurrentTab(newValue);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log("Page change triggered:", { currentTab, newPage: value }); // Debug log
    setPaginationState((prev) => {
      const newState = {
        ...prev,
        [currentTab]: {
          ...prev[currentTab as keyof PaginationState],
          page: value,
        },
      };
      console.log("New pagination state:", newState); // Debug log
      return newState;
    });
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newRowsPerPage = event.target.value as number;
    console.log("Rows per page changed:", newRowsPerPage); // Debug log
    setRowsPerPage(newRowsPerPage);
    // Reset pagination state when changing rows per page
    setPaginationState({
      pending: { page: 1, totalPages: 1, totalItems: 0 },
      approved: { page: 1, totalPages: 1, totalItems: 0 },
      rejected: { page: 1, totalPages: 1, totalItems: 0 },
    });
  };

  const handleApprove = async (id: string) => {
    try {
      await approveAdmin(id);
      await getAlllData();
    } catch (error) {
      console.error("Error approving admin:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectAdmin(id);
      await getAlllData();
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
  let currentPaginationState = { page: 1, totalPages: 1, totalItems: 0 };

  switch (currentTab) {
    case "pending":
      displayData = pendingAdmins;
      currentPaginationState = paginationState.pending;
      break;
    case "approved":
      displayData = approvedAdmins;
      currentPaginationState = paginationState.approved;
      break;
    case "rejected":
      displayData = rejectedAdmins;
      currentPaginationState = paginationState.rejected;
      break;
    case "available":
      displayData = organizations;
      break;
    default:
      displayData = [];
  }

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
      <Container sx={{ flexGrow: 1, py: 2 }} maxWidth={false}>
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

        {displayData.length > 0 ? (
          <Grid
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "left",
              py: 2,
            }}
            container
            spacing={4}
          >
            {displayData.map((item) => (
              <Grid key={item._id} item xs={12} sm={6} md={3}>
                {isUserData(item) ? (
                  <OrganisationCard
                    title={item.username}
                    description=""
                    image="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
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
                    image={
                      item.org_image_url ||
                      "https://picsum.photos/200/300/?blur"
                    }
                    fields={item.org_location.map((loc, index) => ({
                      label: `Location ${index + 1}`,
                      value: loc.loc,
                    }))}
                    status={item.isActive ? "Active" : "Inactive"}
                    actions={getActions(item)}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoData
            message="No Data"
            image={noData}
            boxStyle={styles.noDataBox}
            imgStyle={{
              width: "100%",
              height: "150px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          />
        )}

        {currentTab !== "available" && displayData.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
              mt: 2,
              pb: 2,
              borderTop: "1px solid #e0e0e0",
              pt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl variant="outlined" size="small">
                <Select<number>
                  value={rowsPerPage}
                  onChange={handleRowsPerPageChange}
                  sx={{ height: "32px" }}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">
                {`${
                  (currentPaginationState.page - 1) * rowsPerPage + 1
                }-${Math.min(
                  currentPaginationState.page * rowsPerPage,
                  currentPaginationState.totalItems
                )} of ${currentPaginationState.totalItems}`}
              </Typography>
              <Pagination
                count={currentPaginationState.totalPages}
                page={currentPaginationState.page}
                onChange={handlePageChange}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
                siblingCount={1}
                disabled={currentPaginationState.totalPages <= 1}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
 
};

export default SuperAdminLandingPage;
