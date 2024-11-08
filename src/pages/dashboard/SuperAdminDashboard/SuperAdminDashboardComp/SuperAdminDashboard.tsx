import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
import {
  getAdmins,
  getOrganizations,
} from "../../../../services/OrganisationService/OrgCRUD";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  cardStyles,
  cardMediaStyles,
  titleStyles,
  statusStyles,
  cardActionsStyles,
  buttonStyles,
} from "../../../../components/OrganisationCardComp/OrganisationCardStyles";

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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 4,
};

const SuperAdminDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [admins, setAdmins] = useState<UserData[]>([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const data = await getAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* Scrollable Organisation Cards Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={titleStyles}>
            Available Organisations
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate("/supAdmin")}
          >
            View More
          </Button>
        </Box>
        <Slider {...settings}>
          {organizations.map((org) => (
            <Box key={org._id} sx={{ minWidth: 450, padding: "0 18px" }}>
              <OrganisationCard
                title={org.org_name}
                description=""
                image="https://via.placeholder.com/400x320"
                fields={[
                  ...org.org_location.map((loc, index) => ({
                    label: `Location ${index + 1}`,
                    value: loc.loc,
                  })),
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
        </Slider>

        {/* Static Organisation Approval Cards Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={titleStyles}>
            Pending Admins Approval
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => navigate("/supAdmin")}
          >
            View More
          </Button>
        </Box>
        <Slider {...settings}>
          {admins.map((admin) => (
            <Box key={admin._id} sx={{ minWidth: 350, padding: "0 18px" }}>
              <OrganisationCard
                title={admin.username}
                description=""
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
                    onClick: () => console.log("Approve"),
                  },
                  {
                    label: "Reject",
                    color: "error",
                    onClick: () => console.log("Reject"),
                  },
                ]}
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default SuperAdminDashboard;
