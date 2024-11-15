import { SxProps, Theme } from "@mui/material";
import boyLogo from "../../../assets/boy.svg";
import girlLogo from "../../../assets/Girl.svg";

export const styles: { [key: string]: SxProps<Theme> } = {
  innerContainerStyle: {
    py: 4,
  },

  gridItem: {
    p: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleTypography: {
    mx: 3,
    fontWeight: "bold",
    fontSize: "1.4rem",
  },

  paperStyle: {
    padding: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "1.2rem",
    backgroundColor: " #f2f3f4",
    width: "100%",
    textAlign: "center",
    boxShadow: 3,
  },
  buttonStyle: {
    variant: "contained",
    borderRadius: "1.2rem",
    borderColor: "primary.main",
    color: "primary.main",
    padding: "5px 15px",
    mt: 2,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e43e38",
      color: "#fff",
    },
  },

  sliderItem: {
    padding: 1,
  },

  sectionTitle: {
    mt: 3,
    mx: 2,
    fontWeight: "bold",
    fontSize: "1.4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight:{sm:8,xs:5},
    marginLeft:{sm:10,xs:5}
  },

  outerGrid: {
    display: "flex",
    justifyContent: "center",
  },
  innerGridA: {
    boxShadow: 3,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    borderRadius: "1.2rem",
    alignItems: "center",
    // marginLeft: 2,
  },
  taskBox: {
    // marginRight: 1,
    boxShadow: 3,
    padding: 2,
    borderRadius: "1.2rem",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#ecf0f1",
    gap: 3,
  },
  boyLogoStyle: {
    width: 150,
    height: 150,
    backgroundColor: "#ecf0f1",
    backgroundImage: `url(${boyLogo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: { xs: "none", sm: "block" },
    marginTop: 5,
  },
  taskContainer: {
    backgroundColor: "#ecf0f1",
    borderRadius: "1.2rem",
    boxShadow:
      "2px 2px 2px 2px rgba(0,0,0,0.2), 2px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 3px rgba(0,0,0,0.12)",
    padding: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 350,
    margin: "auto",
  },
  taskHeader: {
    fontWeight: 600,
    marginBottom: 1,
    color: "#333333",
  },
  taskButton: {
    borderRadius: "1.2rem",
    borderColor: "primary.main",
    color: "primary.main",
    padding: "5px 15px",
    mt: 2,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e43e38",
      color: "#fff",
    },
  },
  girlLogoStyle: {
    width: 200,
    height: 200,
    backgroundColor: "#ecf0f1",
    backgroundImage: `url(${girlLogo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: { xs: "none", sm: "block" },
    marginTop: 1,
  },
  pendingCountStyle: {
    fontWeight: "bold",
  },
  roundedCardStyle: {
    borderRadius: "16px",
    backgroundColor: "#2195e1",
    pl: 5,
    pr: 10,
    alignItems: "center",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    pt: 0.5,
    pb: 0.5,
  },
  buttonStyleSeeAll: {
    variant: "contained",
    borderRadius: "1.2rem",
    borderColor: "primary.main",
    color: "primary.main",
    padding: "5px 15px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#e43e38",
      color: "#fff",
    },
  },
  cardTypography: {
    color: "#fff",
  },
  // new
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
  typographyStyle: {
    mt: 1,
    fontWeight: 500,
  },
};

export const tooltipStyle = {
  backgroundColor: "#ecf0f1",
  borderRadius: "15px",
  padding: "10px",
  color: "white",
};
