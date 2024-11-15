import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ConfirmationDialogProps } from "./ConfirmationDialog.types";
import { styles } from "./ConfirmationDialog.styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  actionType = null,
}) => {
  // Function to render the icon based on the actionType
  const renderIcon = () => {
    if (actionType === "approve") {
      return <CheckCircleOutlineIcon color="success" sx={{ marginRight: 2 }} />;
    }
    if (actionType === "reject") {
      return <WarningAmberIcon color="warning" sx={{ marginRight: 2 }} />;
    }
    return null;
  };

  // Conditional content based on actionType
  const renderContent = () => {
    if (actionType === "approve") {
      return (
        <>
          <DialogContentText variant="body2" >{content}</DialogContentText>
          <DialogContentText variant="body2">
            This action will approve the retailer and allow them to proceed.
          </DialogContentText>
        </>
      );
    }
    if (actionType === "reject") {
      return (
        <>
          <DialogContentText variant="body2">{content}</DialogContentText>
          <DialogContentText variant="body2">
            This action is irreversible and will reject the retailer.
          </DialogContentText>
        </>
      );
    }
    return <DialogContentText variant="body2">{content}</DialogContentText>;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{borderRadius:1}}>
      <DialogTitle sx={styles.modalTitle}>
        {renderIcon()}
        {title}
      </DialogTitle>
      <DialogContent sx={styles.modalContent}>{renderContent()}</DialogContent>
      <DialogActions sx={styles.modalActions}>
        <Button onClick={onClose} color="primary" sx={styles.modalButton}>
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          color={actionType === "approve" ? "success" : "error"}
          autoFocus
          sx={styles.modalButton}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
