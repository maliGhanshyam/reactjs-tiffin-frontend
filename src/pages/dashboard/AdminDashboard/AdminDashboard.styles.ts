import { SxProps, Theme } from "@mui/material";
import boyLogo from "../../../assets/boy.svg";
import girlLogo from "../../../assets/Girl.svg";

export const innerContainerStyle: SxProps<Theme> = {
  flexGrow: 1,
  py: 3,
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
  padding: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1.2rem",
  backgroundColor: " #f2f3f4",
  width: "100%",
  textAlign: "center",
  boxShadow: 3,
};
export const buttonStyle: SxProps<Theme> = {
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
};

export const sliderItem: SxProps<Theme> = {
  padding: 1,
};

export const sectionTitle: SxProps<Theme> = {
  mt: 3,
  mx: 3,
  fontWeight: "bold",
  fontSize: "1.4rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const outerGrid: SxProps<Theme> = {
  display: "flex",
  gap: 2,
};
export const innerGridA: SxProps<Theme> = {
  boxShadow: 3,
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ecf0f1",
  borderRadius: "1.2rem",
  alignItems: "center",
  marginLeft:2
};
export const taskBox: SxProps<Theme> = {
  marginRight: 3,
  boxShadow: 3,
  padding: 2,
  borderRadius: "1.2rem",
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#ecf0f1",
  gap: 3,
};
export const boyLogoStyle: SxProps<Theme> = {
  width: 150,
  height: 150,
  backgroundColor: "#ecf0f1",
  backgroundImage: `url(${boyLogo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: { xs: "none", sm: "block" },
  marginTop: 5,
};
export const taskContainer: SxProps<Theme> = {
  backgroundColor: "#ecf0f1",
  borderRadius: "1.2rem",
  boxShadow: 1,
  padding: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: 400,
  margin: "auto",
};
export const taskHeader: SxProps<Theme> = {
  fontWeight: 600,
  marginBottom: 1,
  color: "#333333",
};
export const taskButton: SxProps<Theme> = {
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
};
export const girlLogoStyle: SxProps<Theme> = {
  width: 200,
  height: 200,
  backgroundColor: "#ecf0f1",
  backgroundImage: `url(${girlLogo})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: { xs: "none", sm: "block" },
  marginTop: 1,
};
export const pendingCountStyle: SxProps<Theme> = {
  fontWeight: "bold",
};

export const tooltipStyle = {
  backgroundColor: "#ecf0f1",
  borderRadius: "15px",
  padding: "10px",
  color: "white",
};
export const roundedCardStyle: SxProps<Theme> = {
  borderRadius: "16px",
  backgroundColor: "#2195e1", 
  pl:5,
  pr:10,
  alignItems: "center",
  textAlign: "center", 
  display: "flex",  
  justifyContent: "center",
  pt:0.5,
  pb:0.5
};
export const buttonStyle2: SxProps<Theme> = {
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
};
export const cardTypography: SxProps<Theme> = {
  color: "#fff"
};