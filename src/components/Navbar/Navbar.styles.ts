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
  button: {
    fontSize: "1.05rem",
    marginLeft: 4,
    display: { xs: "none", sm: "block" },
  },
  button2: {
    fontSize: "1.05rem",
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
