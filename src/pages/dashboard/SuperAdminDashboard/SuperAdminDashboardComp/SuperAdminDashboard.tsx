import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
import {
  getPendingAdmins,
  getOrganizations,
} from "../../../../services/OrganisationService/OrganizationService";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { titleStyles } from "./SuperAdminDashboardStyle";
import { Organization, UserData } from "../../../../Types";

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
    const fetchPendingAdmins = async () => {
      try {
        const data = await getPendingAdmins();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchPendingAdmins();
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
            variant="outlined"
            color="primary"
            size="small"
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
                image="https://picsum.photos/200/300/?blur"
                fields={[
                  ...org.org_location.map((loc) => ({
                    label: `Location `,
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
            variant="outlined"
            size="small"
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
                image="https://picsum.photos/200/300/?blur"
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
