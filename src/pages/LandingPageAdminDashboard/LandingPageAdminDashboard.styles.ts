import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  containerStyle: {
    py: 4,
  },
  buttonGroupStyle: {
    display: "flex",
    mb: 3,
    alignItems: "center",
    flexDirection: { xs: "row", sm: "row" },
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
    marginRight:8
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
  innerCardContainerStyleAR: {
    minWidth: 320,
    // mr: 2,
  },
  innerCardContainerStyle: {
    minWidth: 320,
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
    marginRight:"20px"
  },
  activeButton: {
    borderRadius: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#e43e38",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e43e38",
    },
    marginRight:"20px"
  },
  inactiveButton: {
    borderRadius: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "transparent",
    },
    marginRight:"20px"
  },
  searchStyle: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight:"66px"
  },
  searchTermStyle: {
    width: 250,
    borderRadius: 3,
    marginRight: 2,
  },
  view: {
    minHeight:"700px",
    marginLeft:"50px",
    marginRight:"30px",
  },
  content: { 
    minHeight:"700px",
    marginLeft:"50px",
    marginRight:"30px",
  },
};
