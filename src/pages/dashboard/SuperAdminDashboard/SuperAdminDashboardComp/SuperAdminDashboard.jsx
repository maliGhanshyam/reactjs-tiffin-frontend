import React from "react";
import { Grid2 } from '@mui/material';
import { Box, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
import OrganisationApprovalCard from "../../../../components/OrganisationCardComp/OrganisationApprovalCard";

const SuperAdminDashboard = () => {
  const organisations = [
    {
      title: "First Organization",
      description: "This is my first try to add a new data",
      location: "Mumbai",
      status: "Active",
    },
    {
      title: "Second Organization",
      description: "Exploring new data here",
      location: "Pune",
      status: "Pending",
    },
    {
      title: "Third Organization",
      description: "Adding another org to the list",
      location: "Delhi",
      status: "Active",
    },
    {
      title: "Fourth Organization",
      description: "Continuing with more orgs",
      location: "Bangalore",
      status: "Inactive",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* Scrollable Organisation Cards Section */}
        <Typography variant="h5" sx={{ mb: 2 }}>
         Available Organisations
        </Typography>
        <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
          {organisations.map((org, index) => (
            <Box key={index} sx={{ minWidth: 350, mr: 2 }}>
              <OrganisationCard
                title={org.title}
                description={org.description}
                location={org.location}
                status={org.status}
              />
            </Box>
          ))}
        </Box>

        {/* Static Organisation Approval Cards Section */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Pending Organisation Approvals
        </Typography>
        <Grid2 container spacing={3}>
          {organisations.map((org, index) => (
            <Grid2
              key={index}
              xs={12} // Full width on extra-small screens (mobile)
              sm={6} // Two columns on small screens (tablet)
              md={4} // Three columns on medium and larger screens (desktop)
            >
              <OrganisationApprovalCard
                title={org.title}
                description={org.description}
                location={org.location}
                status={org.status}
              />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default SuperAdminDashboard;
