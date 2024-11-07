import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#2e4053",
      light: "#a5aeb7",
      dark: "#d32f2f",
    },
    secondary: {
      main: "#5d6d7e",
      light: "#687890",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
};

const Theme = createTheme(themeOptions);

export default Theme;
