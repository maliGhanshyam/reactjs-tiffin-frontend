import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
// import OrganisationApprovalCard from "../../../../components/OrganisationCardComp/OrganisationApprovalCard";
import {
  getAdmins,
  getOrganizations,
} from "../../../../services/OrganisationService/OrgCRUD";

// Define a TypeScript interface for the organization data structure
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

const SuperAdminDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);
  //TODO:
  const [admins, setAdmins] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* Scrollable Organisation Cards Section */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Available Organisations
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
          {organizations.map((org) => (
            <Box key={org._id} sx={{ minWidth: 350, mr: 2 }}>
              <OrganisationCard
                title={org.org_name}
                description={``}
                image="https://via.placeholder.com/400x320"
                fields={[
                  ...org.org_location.map((loc, index) => ({
                    label: `Location ${index + 1}`,
                    value: loc.loc,
                  })),
                  // { label: "Contact", value: org.org_location[0]?.loc_contact },
                  // { label: "Email", value: org.org_location[0]?.loc_email },
                ]}
                status={org.isActive ? "Active" : "Inactive"}
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
            </Box>
          ))}
        </Box>

        {/* Static Organisation Approval Cards Section */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Pending Admins Approvals
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
          {admins.map((admin) => (
            <Box key={admin._id} sx={{ minWidth: 350, mr: 2 }}>
              <OrganisationCard
                title={admin.username}
                description={``}
                image="https://via.placeholder.com/400x320"
                fields={[
                  {
                    label: `Location`,
                    value: admin.address,
                  },
                ]}
                status={
                  admin.role_specific_details.approval_status
                    ? "Active"
                    : "Inactive"
                }
                actions={[
                  {
                    label: "Approve",
                    color: "primary",
                    onClick: () => console.log("Update"),
                  },
                  {
                    label: "Reject",
                    color: "error",
                    onClick: () => console.log("Delete"),
                  },
                ]}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SuperAdminDashboard;
