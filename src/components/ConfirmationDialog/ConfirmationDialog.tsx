import React, { useEffect, useState } from "react";
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
import { TextField } from "@mui/material";

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
  const [rejectionReason, setRejectionReason] = useState<string>("");
  useEffect(() => {
    if (actionType !== "reject") {
      setRejectionReason(""); // Clear when switching from "reject" action
    }
  }, [actionType]);
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
          <DialogContentText variant="body2" sx={{ paddingY: 1 }}>
            {content}
          </DialogContentText>
          <DialogContentText variant="body2">
            This action will approve the retailer and allow them to proceed.
          </DialogContentText>
        </>
      );
    }
    if (actionType === "reject") {
      return (
        <>
          <DialogContentText variant="body2" sx={{ paddingY: 1 }}>
            {content}
          </DialogContentText>
          <TextField
          label="Rejection Reason"
          variant="outlined"
          fullWidth
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          multiline
          rows={2}
          sx={{ marginTop: 2 }}
        />
        </>
      );
    }
    return <DialogContentText variant="body2">{content}</DialogContentText>;
  };

  const handleConfirm = () => {
    onConfirm(rejectionReason); // Pass rejection reason 
    onClose(); 
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={styles.modalTitle}>
        {renderIcon()}
        {title}
      </DialogTitle>
      <DialogContent sx={styles.modalContent}>{renderContent()}</DialogContent>
      <DialogActions sx={styles.modalActions}>
        <Button onClick={onClose} color="primary" variant="contained" sx={styles.modalButton}>
          {cancelButtonText}
        </Button>
        <Button
          onClick={handleConfirm}
          color={actionType === "approve" ? "success" : "error"}
          autoFocus
          variant="contained"
          sx={styles.modalButton}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
