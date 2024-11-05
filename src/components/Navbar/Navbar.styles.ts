import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const styles: { [key: string]: SxProps<Theme> } = {
  appBar: {
    position: "static",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#caf010",
    letterSpacing: "0.1em",
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
  },
  button: {
    fontSize: "1.05rem",
    marginLeft: 4,
    display: { xs: "none", sm: "block" },
  },
  drawerBox: {
    width: "auto",
    padding: 2,
  },
  iconButton: {
    display: { sm: "none" },
  },
};

export const logoStyle = {
  height: "45px",
  width: "30px",
  borderRadius: "45%",
  marginRight: "10px",
};
