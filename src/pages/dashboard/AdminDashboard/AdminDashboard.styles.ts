import { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};
export const innerContainerStyle: SxProps<Theme> = {
  flexGrow: 1, 
  py: 3
};

export const summaryTypography: SxProps<Theme> = {
  mb: 2,
};

export const gridContainer: SxProps<Theme> = {
  mb: 4,
};

export const gridItem: SxProps<Theme> = {
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const titleTypography: SxProps<Theme> = {
  mx: 3,
  fontWeight: "bold",
  fontSize: "1.4rem",
};

export const paperStyle: SxProps<Theme> = {
  p: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const buttonStyle: SxProps<Theme> = {
  variant: "contained",
  color: "primary",
};
export const buttonStyle2: SxProps<Theme> = {
  variant: "contained",
  color: "primary",
};

export const sliderItem: SxProps<Theme> = {
  padding: 1,
};

export const modalTitle: SxProps<Theme> = {
  display: "flex", alignItems: "center", gap: 1 
};

export const modalActions: SxProps<Theme> = {
  padding: "16px"
};

export const sectionTitle: SxProps<Theme> = {
  mt:3,
  mx: 3,
  fontWeight: "bold",
  fontSize: "1.4rem",
  display: "flex", 
  justifyContent: "space-between"
};

export const modalContent: SxProps<Theme> = {
  padding: "16px",
  backgroundColor: "#f9f9f9",
  borderRadius: 1,
};

export const modalButton: SxProps<Theme> = {
  minWidth: "100px"
};