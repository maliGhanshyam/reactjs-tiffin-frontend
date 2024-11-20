import React from "react";
import { Box } from "@mui/material";
import { ActionCard } from "../ActionCard";
import { RetailerInfoCard } from "../RetailerInfoCard";
import { styles } from "./RetailerCard.styles";
import { RetailerCardProps } from "./RetailerCard.types";

const RetailerCard: React.FC<RetailerCardProps> = ({
  retailer,
  onApprove,
  onReject,
  showButtons = false,
}) => {
  const style = showButtons ? styles.innerCardContainerStyle : styles.innerCardContainerStyleAR;
  return (
    <Box sx={style}>
      <ActionCard
        sx={styles.cardStyles}
        imageUrl={retailer.user_image!}
        imageStyles={styles.cardMediaStyles}
      >
        <RetailerInfoCard
          retailer={retailer}
          showButtons={true}
          onApprove={onApprove}
          onReject={onReject}
        />
      </ActionCard>
    </Box>
  );
};

export default RetailerCard;
