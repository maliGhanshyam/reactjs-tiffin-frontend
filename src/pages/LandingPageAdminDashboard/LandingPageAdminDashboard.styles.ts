import { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  py: 3,
};

export const buttonGroupStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  mb: 4,
  alignItems: "center",
};

export const tabButtonStyle: SxProps<Theme> = {
  borderRadius: "1.2rem",
  mr: 2,
  fontWeight:"bold"
};

export const paginationStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "end",
  mt: 3,
};

export const cardContainerStyle: SxProps<Theme> = {
  display: "flex",
  overflowX: "auto",
  pb: 2,
};

export const titleStyle: SxProps<Theme> = {
  mb: 2,
};

export const dialogActionsStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
};

export const modalContentStyle: SxProps<Theme> = {
  variant: "body1",
};

export const innerCardContainerStyle: SxProps<Theme> = {
  minWidth: 350,
   mr: 2
};

export const modalTitle: SxProps<Theme> = {
  display: "flex", alignItems: "center", gap: 1 
};

export const modalActions: SxProps<Theme> = {
  padding: "12px"
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
  padding: "8px",
  backgroundColor: "#f9f9f9",
  borderRadius: 2,
};

export const modalButton: SxProps<Theme> = {
  minWidth: "100px"
};