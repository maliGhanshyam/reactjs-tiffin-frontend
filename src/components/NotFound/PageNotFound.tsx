import React from "react";
import { Typography, Container, Box } from "@mui/material";

const PageNotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        marginTop: "20vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h1"
          color="error"
          fontWeight="bold"
          sx={{ fontSize: "6rem" }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          gutterBottom
          sx={{ fontWeight: "medium" }}
        >
          Oops! Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ fontSize: "1rem", maxWidth: "80%", mx: "auto" }}
        >
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>
      </Box>
    </Container>
  );
};

export default PageNotFound;
