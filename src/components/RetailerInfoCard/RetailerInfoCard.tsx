import React from "react";
import { Box, Button, CardActions, Typography } from "@mui/material";
import { RetailerInfoCardProps } from "./RetailerInfoCard.types";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { styles } from "./RetailerInfo.styles";

//To avoid repeted code in Retailer cards this component is used 
const RetailerInfoCard: React.FC<RetailerInfoCardProps> = ({
  retailer,
  showButtons = false, // control whether buttons to be shown or not
  onApprove,
  onReject,
  onTrendy
}) => {
  const truncate = (address: string) => {
    return address.length > 25 ? `${address.slice(0, 24)}...` : address;
  };
  const approvalStatus = retailer.role_specific_details?.approval[0]?.approval_status;
  return (
    <Box sx={styles.boxStyle}>
      <Typography variant="h6" sx={styles.titleStyles}>{retailer.username}</Typography>
      <Typography
        variant="body2"
        sx={styles.descriptionStyles}
      >{`Email: ${retailer.email}`}</Typography>
      <Typography
        variant="body2"
        sx={{
          mt: 1,
          fontWeight: 500,
          color:
          approvalStatus?.toLowerCase() === "approved"
              ? "success.main"
              : approvalStatus?.toLowerCase() === "pending"
              ? "warning.main"
              : "error.main",
        }}
      >
        Status: {approvalStatus}
      </Typography>
      <Box sx={styles.fieldsBoxStyles}>
        <Typography variant="body2" color="text.secondary">
          <strong>Contact:</strong> {retailer.contact_number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Address:</strong>{" "}
          {truncate(retailer.address)}
        </Typography>
      </Box>
      {showButtons && (
        <CardActions sx={styles.cardActionsStyles}>
          {onApprove && (
            <Button
              onClick={() => onApprove(retailer._id)}
              size="small"
              variant="contained"
              color="success"
              sx={styles.buttonStyles}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Approve
            </Button>
          )}
          {onReject && (
            <Button
              onClick={() => onReject(retailer._id)}
              size="small"
              variant="contained"
              color="error"
              sx={styles.rejectButtonStyles}
              startIcon={<DeleteIcon />}
            >
              Reject
            </Button>
          )}
          {onTrendy && (
            <Button
              onClick={() => onTrendy(retailer._id)}
              size="small"
              variant="contained"
              color="warning"
              sx={styles.trendyButtonStyles}
              startIcon={<LocalFireDepartmentIcon />}
            >
              Trendy
            </Button>
          )}
        </CardActions>
      )}
    </Box>
  );
};

export default RetailerInfoCard;
