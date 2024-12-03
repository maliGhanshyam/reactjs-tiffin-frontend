import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  containerStyle: {
    py: 4,
  },
  buttonGroupStyle: {
    display: "flex",
    mb: 3,
    marginLeft: {sm:"65px",xs:"20px"},
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    marginRight: {sm:"65px",xs:"20px"}
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
    marginRight: 8,
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
    marginRight: "20px",
  },
  activeButton: {
    borderRadius: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#e43e38",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#e43e38",
    },
    marginRight: { sm: "20px" },
    marginBottom: { xs: 1, sm: 0 },
  },
  inactiveButton: {
    borderRadius: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "primary.main",
    "&:hover": {
      backgroundColor: "transparent",
    },
    marginRight: { sm: "20px" },
    marginBottom: { xs: 1, sm: 0 },
  },
  searchStyle: {
    display: "flex",
    justifyContent: {sm:"flex-end",xs:"center"},
    marginTop:{sm:0,xs:1}
  },
  searchTermStyle: {
    width: {sm:250,xs:300},
    borderRadius: 3,
  },
  view: {
    minHeight: "700px",
    marginLeft: {sm:"50px",xs:"30px"},
    marginRight: {sm:"30px",xs:"0px"},
  },
  content: {
    marginLeft: {sm:"50px",xs:"20px"},
    marginRight: {sm:"30px",xs:"20px"}
  },
  noDataBox: {
    textAlign: "center",
    mt: 5,
  },
  gridButtonGroup:{
      display: "flex",
      justifyContent: "flex-start",
      gap: { xs: 1, sm: 0 },
  }
};

export const noDataImgStyle = {
  width: "100%",
  maxWidth: "60%",
  height: "auto",
  marginLeft: "auto",
  marginRight: "auto",
  display: "block",
};

export const getButtonStyles = (
  tab: string,
  activeTab: string,
  styles: any
) => {
  return {
    ...(activeTab === tab ? styles.activeButton : styles.inactiveButton),
  };
};
