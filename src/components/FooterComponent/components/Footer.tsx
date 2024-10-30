import React, { FC, ReactElement } from "react";
import { Box, Container, Grid2, Typography,Link } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "secondary.main",
        marginTop:"10px",
        paddingTop: "1rem",
        paddingBottom: "1rem"
        
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container justifyContent="space-between" alignItems="center">
          {/* Contact Information */}
          <Grid2 size={{ xs: 12, md: 4 }} textAlign="left">
            <Typography variant="body1" color="textPrimary">
              <strong>Contact:</strong> tiffinService@gmail.com | Phone: (123) 456-7890
            </Typography>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4}} textAlign={{ xs: "center", md: "center" }} sx={{ mt: 2 }}>
            <Typography color="black" variant="h5">
                Tiffin Service App
              </Typography>
              <Typography color="textSecondary" variant="subtitle1">
                {`@${new Date().getFullYear()} `}
              </Typography>
          </Grid2>

          {/* Social Media Links */}
          <Grid2 size={{ xs: 12, md: 4 }} textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="body1" color="textPrimary">
              <strong>Follow Us:</strong>
              <Link href="https://facebook.com" target="_blank" color="inherit" sx={{ ml: 1 }}>
                Facebook
              </Link>
              <Link href="https://twitter.com" target="_blank" color="inherit" sx={{ ml: 1 }}>
                Twitter
              </Link>
              <Link href="https://instagram.com" target="_blank" color="inherit" sx={{ ml: 1 }}>
                Instagram
              </Link>
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;