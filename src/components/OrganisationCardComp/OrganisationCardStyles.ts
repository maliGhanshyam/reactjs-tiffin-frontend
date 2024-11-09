// OrganisationCardStyles.ts

import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  maxWidth: 350,
  height: 400,
  backgroundColor: "#f9f9f9",
  borderRadius: 5,
  marginTop: "10px",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: 4,
    backgroundColor: "#f1f1f1",
    // margin: 2,
    borderRadius: 5,
  },
};

export const cardMediaStyles: SxProps<Theme> = {
  height: 140,
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: "bolder",
  fontFamily: "CustomFont, Arial, sans-serif",
  fontSize: "1.2rem",
};

export const statusStyles = (status: string): SxProps<Theme> => ({
  mt: 1,
  color:
    status.toLowerCase() === "active"
      ? "success.main"
      : status.toLowerCase() === "pending"
      ? "warning.main"
      : "error.main",
});

export const cardActionsStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  paddingBottom: 2,
  position: "relative",
};

export const buttonStyles = (color: "primary" | "error"): SxProps<Theme> => ({
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: color === "primary" ? "primary.main" : "primary.dark",
    color: "white",
  },
});
