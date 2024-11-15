import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  titleStyles: {
    fontWeight: 600,
  },
  descriptionStyles: {
    mb: 2,
  },
  fieldsBoxStyles: {
    mt: 2,
  },
  cardActionsStyles: {
    justifyContent: "center",
    marginTop: 1,
    gap:3
  },
  buttonStyles: {
    borderRadius: 1,
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "success.dark",
    },
  },

  rejectButtonStyles: {
    borderRadius: 1,
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "error.dark",
    },
    paddingRight:"16px"
  },

  trendyButtonStyles: {
    borderRadius: 1,
    textTransform: "none",
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "warning.dark",
    },
  },
  activeButton: {
    borderRadius: "1.2rem",
    mr: 2,
    fontWeight: "bold",
    backgroundColor: "#e43e38",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e43e38",
    },
  },
  inactiveButton: {
    borderRadius: "1.2rem",
    mr: 2,
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  boxStyle:{
    p:2
  }
};

