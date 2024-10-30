import React, { useEffect, useState }  from "react";
//import { Grid2 } from "@mui/material"; // Import the experimental Grid2 component
import { Box, Container, Typography } from "@mui/material";
import OrganisationCard from "../../../../components/OrganisationCardComp/OrganisationCard";
// import OrganisationApprovalCard from "../../../../components/OrganisationCardComp/OrganisationApprovalCard";
import {getOrganizations} from "../../../../services/OrganisationService/OrgCRUD"
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

const SuperAdminDashboard: React.FC = () => {
  // const organisations: Organisation[] = [
  //   {
  //     title: "First Organization",
  //     description: "This is my first try to add a new data",
  //     location: "Mumbai",
  //     status: "Active",
  //   },
  //   {
  //     title: "Second Organization",
  //     description: "Exploring new data here",
  //     location: "Pune",
  //     status: "Pending",
  //   },
  //   {
  //     title: "Third Organization",
  //     description: "Adding another org to the list",
  //     location: "Delhi",
  //     status: "Active",
  //   },
  //   {
  //     title: "Fourth Organization",
  //     description: "Continuing with more orgs",
  //     location: "Bangalore",
  //     status: "Inactive",
  //   },
  // ];
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
                description={`Locations: ${
                  org.org_location.length
                } | Created: ${new Date(
                  org.org_created_at
                ).toLocaleDateString()}`}
                locations={org.org_location} // Pass the entire array of locations
                status={org.isActive ? "Active" : "Inactive"}
                // You can also pass extra fields if needed, e.g.:
                // extraField1={someValue1}
                // extraField2={someValue2}
              />
            </Box>
          ))}
        </Box>

        {/* Static Organisation Approval Cards Section */}
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Pending Organisation Approvals
        </Typography>
        {/* <Grid2 container spacing={3} size={12}>
          {organisations.map((org) => (
            // eslint-disable-next-line react/jsx-key
            <Grid2>
              <OrganisationApprovalCard
                title={org.title}
                description={org.description}
                location={org.location}
                status={org.status}
              />
            </Grid2>
          ))}
        </Grid2> */}
      </Container>
    </Box>
  );
};

export default SuperAdminDashboard;
