import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  maxWidth: 350,
  margin: 2,
  borderRadius: 2,
  boxShadow: 3,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

export const cardMediaStyles: SxProps<Theme> = {
  height: 140,
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
};

export const titleStyles: SxProps<Theme> = {
  fontWeight: 600,
};

export const descriptionStyles: SxProps<Theme> = {
  mb: 2,
};
export const fieldsBoxStyles: SxProps<Theme> = {
  mt: 2,
};

export const cardActionsStyles: SxProps<Theme> = {
  justifyContent: "center",
  gap: 0.5,
  mb: 1,
};

export const buttonStyles: SxProps<Theme> = {
  borderRadius: 1,
  textTransform: "none",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "success.dark",
  },
};

export const rejectButtonStyles: SxProps<Theme> = {
  ...buttonStyles,
  "&:hover": {
    backgroundColor: "error.dark",
  },
};

export const trendyButtonStyles: SxProps<Theme> = {
  ...buttonStyles,
  "&:hover": {
    backgroundColor: "warning.dark",
  },
};