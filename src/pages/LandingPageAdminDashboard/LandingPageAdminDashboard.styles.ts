import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  containerStyle: {
    py: 3,
  },
  buttonGroupStyle: {
    display: "flex",
    justifyContent: "center",
    mb: 4,
    alignItems: "center",
    flexDirection: { xs: "column", sm: "row" },
  },
  tabButtonStyle: {
    borderRadius: "1.2rem",
    mr: 2,
    fontWeight: "bold",
  },
  paginationStyle: {
    display: "flex",
    justifyContent: "end",
    mt: 3,
  },
  cardContainerStyle: {
    display: "flex",
    // overflowX: "auto",
  },
  titleStyle: {
    mb: 2,
  },
  dialogActionsStyle: {
    display: "flex",
    justifyContent: "space-between",
  },
  modalContentStyle: {
    variant: "body1",
  },
  innerCardContainerStyle: {
    minWidth: 350,
    mr: 2,
  },
  modalTitle: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  modalActions: {
    padding: "12px",
  },
  sectionTitle: {
    mt: 3,
    mx: 3,
    fontWeight: "bold",
    fontSize: "1.4rem",
    display: "flex",
    justifyContent: "space-between",
  },
  modalContent: {
    padding: "8px",
    backgroundColor: "#f9f9f9",
    borderRadius: 2,
  },
  modalButton: {
    minWidth: "100px",
  },
  cardMediaStyles: {
    height: 140,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  cardStyles: {
    maxWidth: 350,
    margin: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  titleStyles: {
    fontWeight: 600,
  },
  descriptionStyles: {
    mb: 2,
  },
  fieldsBoxStyles: {
    mt: 2,
  },
  //new
  cardActionsStyles: {
    justifyContent: "center",
    marginTop: 1,
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
};
