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
        paddingBottom: "1rem",
        position:"fixed",
        bottom:0
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Grid2 size={12}>
            <Typography color="black" variant="h5">
              Tiffin Service App
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`@${new Date().getFullYear()} `}
            </Typography>
          </Grid2>
          {/* About Us */}
          <Grid2 size={{ xs: 12, md: 4}} textAlign={{ xs: "center", md: "left" }} sx={{ mt: 2 }}>
            <Typography variant="body1" color="textPrimary">
              <strong>About Us</strong>: We are dedicated to bringing delicious homemade meals straight to your doorstep.
            </Typography> 
          </Grid2>

          {/* Contact Information */}
          <Grid2 size={{ xs: 12, md: 4 }} textAlign="center">
            <Typography variant="body1" color="textPrimary">
              <strong>Contact:</strong> tiffinService@gmail.com | Phone: (123) 456-7890
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