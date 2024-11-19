import { SxProps, Theme } from "@mui/material";

export const mainContainer: SxProps<Theme> = {
  mx: "auto",
  mt: 2,
  p: 2,
  border: "1px solid #ccc",
  borderRadius: 1,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "white",
};

export const titleTypography: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: "1rem",
  textAlign: "center",
  marginBottom: "0.2em",
  letterSpacing: "0.0075em",
};

export const inputField: SxProps = {
  width: "45%",
  marginBottom: "4px",
  "& .MuiInputBase-root": {
    padding: "2px 8px",
    marginBottom: "4px",
    marginTop: "0px",
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    height: "0.3em",
    backgroundColor: "white",
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    backgroundColor: "white",
    WebkitBoxShadow: "0 0 0 1000px white inset",
  },
};

export const locationBox: SxProps = {
  mt: 0.1,
  p: 1,
  border: "1px solid #ccc",
  borderRadius: 2,
};

export const expandableBox: SxProps<Theme> = {
  height: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
};

export const fieldContainer: SxProps = {
  "& .MuiInputBase-root": {
    padding: "0 8px 0 8px",
    marginTop: "0px",
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    height: "0.3em",
    margin: "0 4px 2px 4px",
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    backgroundColor: "white",
    WebkitBoxShadow: "0 0 0 1000px white inset",
  },
};

export const addButton: SxProps = {
  mt: 2,
  backgroundColor: "#007bff",
  "&:hover": {
    backgroundColor: "#0056b3",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export const buttonGroup: SxProps = {
  mt: 4,
  display: "flex",
  justifyContent: "flex-end",
  gap: 1,
};

export const saveButton: SxProps = {
  backgroundColor: "#28a745",
  "&:hover": {
    backgroundColor: "#218838",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};
