import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
import {
  getOrganizations,
  getAdminRequests,
} from "../../../../services/OrganisationService/OrganizationService";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { titleStyles } from "./SuperAdminDashboardStyle";
import { Organization, UserData } from "../../../../Types";
import PieChartComponent from "../../../../components/Charts/PieChartComponent";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


const SuperAdminDashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [admins, setAdmins] = useState<UserData[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState(0);
  const [approvedAdmins, setApprovedAdmins] = useState(0);
  const [rejectedAdmins, setRejectedAdmins] = useState(0);
  const navigate = useNavigate();

  // Fetch Organizations
  const fetchOrganizations = async () => {
    try {
      const { data, pagination } = await getOrganizations(
        1,
        10
      );
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  // Fetch Admins by Status
  const fetchAdminsByStatus = async () => {
    try {
      const statuses = ["pending", "approved", "rejected"];
      const page = 1;
      const limit = 10;

      const results = await Promise.all(
        statuses.map(async (status) => {
          const { data, pagination } = await getAdminRequests(
            status,
            page,
            limit
          );
          console.log(`Fetched ${status} admins:`, data); // Debug
          return { status, data, count: pagination.totalItems };
        })
      );

      results.forEach(({ status, data, count }) => {
        if (status === "pending") {
          setPendingAdmins(count);
          setAdmins(data); // Update pending admins
        }
        if (status === "approved") setApprovedAdmins(count);
        if (status === "rejected") setRejectedAdmins(count);
      });
    } catch (error) {
      console.error("Error fetching admins by status:", error);
    }
  };

  // useEffect to fetch data
  useEffect(() => {
    fetchOrganizations();
    fetchAdminsByStatus();
  }, []);

  return (
    <Container
      sx={{
        "@media (max-width: 1600px)": {
          maxWidth: "none",
          marginTop: "16px",
        },
      }}
    >
      {/* Pie Chart */}
      <PieChartComponent
        chartData={[
          { name: "Pending", value: pendingAdmins },
          { name: "Approved", value: approvedAdmins },
          { name: "Rejected", value: rejectedAdmins },
        ]}
      ></PieChartComponent>

      {/* Main Container */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          mx: 3,
        }}
      >
        {/* <Container sx={{ flexGrow: 1, py: 3 }}> */}
        {/* Organizations Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={titleStyles}>
            Available Organisations
          </Typography>
          <Button
            className="custom-outlined"
            variant="outlined" // Uses the default variant from the theme
            color="primary" // Uses the primary color defined in the theme
            size="small" // Uses the default size defined in the theme
            startIcon={<VisibilityIcon />} // Adds the icon
            sx={{ borderRadius: "8px", marginTop: "10px" }}
            onClick={() => navigate("/supAdmin")} // Navigation logic
          >
            View More
          </Button>
        </Box>
        <Slider {...settings}>
          {organizations.map((org) => (
            <Box key={org._id}>
              <OrganisationCard
                title={org.org_name}
                description=""
                image={
                  org.org_image_url || "https://picsum.photos/200/300/?blur"
                }
                fields={[
                  ...org.org_location.map((loc) => ({
                    label: `Location `,
                    value: loc.loc,
                  })),
                ]}
                status={org.isActive ? "Active" : "Inactive"}
                actions={
                  [
                    // {
                    //   label: "Update",
                    //   color: "primary",
                    //   onClick: () => console.log("Update"),
                    // },
                    // {
                    //   label: "Delete",
                    //   color: "error",
                    //   onClick: () => console.log("Delete"),
                    // },
                  ]
                }
              />
            </Box>
          ))}
        </Slider>

        {/* Admins Section */}
        {/* <Box
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
          {admins.length > 0 ? (
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
          ) : (
            <Typography>No admins available for approval.</Typography>
          )} */}
        {/* </Container> */}
      </Box>
    </Container>
  );
};

export default SuperAdminDashboard;
