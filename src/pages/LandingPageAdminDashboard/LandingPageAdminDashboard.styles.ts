import { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  py: 3,
};

export const buttonGroupStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  mb: 4,
  alignItems: "center",
};

export const tabButtonStyle: SxProps<Theme> = {
  borderRadius: 2,
  mr: 2,
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

