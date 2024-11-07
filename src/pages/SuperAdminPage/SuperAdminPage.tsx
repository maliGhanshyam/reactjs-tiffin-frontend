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
  getAdmins,
  getOrganizations,
} from "../../services/OrganisationService/OrgCRUD";

interface OrgLocation {
  loc: string;
  address: string;
  loc_contact: number;
  loc_email: string;
  admin_id: string;
  _id: string;
}

interface Organization {
  _id: string;
  org_name: string;
  org_location: OrgLocation[];
  org_created_at: string;
  org_updated_at: string;
  isActive: boolean;
  __v: number;
}

interface RoleSpecificDetails {
  organization_id: string;
  organization_name: string;
  approval_status: string;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
  role_id: string;
  role_specific_details: RoleSpecificDetails;
}

const SuperAdminPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [admins, setAdmins] = useState<UserData[]>([]);
  const [currentTab, setCurrentTab] = useState<"pending" | "approved">(
    "pending"
  );
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

    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchOrganizations();
    fetchAdmins();
  }, []);

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "pending" | "approved"
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

  const displayData = currentTab === "pending" ? admins : organizations;
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
      <Container sx={{ flexGrow: 1, py: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Super Admin Dashboard
        </Typography>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Pending Admins" value="pending" />
          <Tab label="Approved Organizations" value="approved" />
        </Tabs>
        {/* Scrollable Card Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            py: 2,
          }}
        >
          {displayedData.map((item) => (
            <Box key={item._id} sx={{ m: 2, width: "calc(25% - 16px)" }}>
              {currentTab === "pending" ? (
                <OrganisationCard
                  title={isUserData(item) ? item.username : ""}
                  description={``}
                  image="https://via.placeholder.com/400x320"
                  fields={
                    isUserData(item)
                      ? [
                          {
                            label: `Organization`,
                            value: item.role_specific_details.organization_name,
                          },
                          { label: `Location`, value: item.address },
                        ]
                      : []
                  }
                  status={
                    isUserData(item) && item.role_specific_details
                      ? item.role_specific_details.approval_status
                      : ""
                  }
                  actions={[
                    {
                      label: "Approve",
                      color: "primary",
                      onClick: () => console.log("Approve"),
                    },
                    {
                      label: "Reject",
                      color: "error",
                      onClick: () => console.log("Reject"),
                    },
                  ]}
                />
              ) : (
                <OrganisationCard
                  title={isOrganization(item) ? item.org_name : ""}
                  description={``}
                  image="https://via.placeholder.com/400x320"
                  fields={
                    isOrganization(item)
                      ? item.org_location.map((loc, index) => ({
                          label: `Location ${index + 1}`,
                          value: loc.loc,
                        }))
                      : []
                  }
                  status={
                    isOrganization(item)
                      ? item.isActive
                        ? "Active"
                        : "Inactive"
                      : ""
                  }
                  actions={[
                    {
                      label: "Update",
                      color: "primary",
                      onClick: () => console.log("Update"),
                    },
                    {
                      label: "Delete",
                      color: "error",
                      onClick: () => console.log("Delete"),
                    },
                  ]}
                />
              )}
            </Box>
          ))}
        </Box>
        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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

export default SuperAdminPage;
