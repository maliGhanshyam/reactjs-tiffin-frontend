import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { SnackbarContextProps } from "./SnackbarProvider.types";

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
); //undefined bcz it will used later in component

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  //open:visible, message, severity:type of alert
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 5 }}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

//This will allow components to access the snackbar context
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar not used");
  }
  return context;
};
