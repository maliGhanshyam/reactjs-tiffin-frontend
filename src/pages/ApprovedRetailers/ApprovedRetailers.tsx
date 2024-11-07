import { useEffect, useState } from "react";
import { Box, Container, Typography, Pagination } from "@mui/material";
import { Retailer } from "../dashboard/AdminDashboard/AdminDashboard.types";
import { getApprovedRetailer } from "../../services/Retailer";
import { ActionCard } from "../../components/ActionCard";

const ApprovedRetailers = () => {
  const [approvedRetailers, setApprovedRetailers] = useState<Retailer[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;  // items per page

  useEffect(() => {
    const fetchApprovedRetailers = async () => {
      try {
        const data = await getApprovedRetailer();
        setApprovedRetailers(data.data);
        setTotalPages(Math.ceil(data.data.length / itemsPerPage));  // Calculate total page
      } catch (error) {
        console.error("Error fetching approved retailers:", error);
      }
    };
    fetchApprovedRetailers();
  }, []);

  const handleChangePage = (event: React.ChangeEvent<any>, value: number) => {
    setPage(value);
  };
//unkonwn
  const displayedRetailers = approvedRetailers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Approved Retailers
      </Typography>
      <Box sx={{ display: "flex", overflowX: "auto", pb: 2 }}>
        {displayedRetailers.map((ret) => (
          <Box key={ret._id} sx={{ minWidth: 350, mr: 2 }}>
            <ActionCard
              title={ret.username}
              description={`Email: ${ret.email}`}
              status="Approved"
              fields={[
                { label: "Contact", value: ret.contact_number },
                { label: "Address", value: ret.address }
              ]}
            />
          </Box>
        ))}
      </Box>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{ display: "flex", justifyContent: "center", mt: 3 }}
      />
    </Container>
  );
};

export default ApprovedRetailers;
