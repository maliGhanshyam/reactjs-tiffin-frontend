import React from "react";
import { Card, CardMedia } from "@mui/material";
import { ActionCardProps } from "./ActionCard.types";

const ActionCard: React.FC<ActionCardProps> = ({
  imageUrl,
  imageStyles,
  children,
  sx = {},
}: ActionCardProps) => {
  const defaultImageUrl = "https://via.placeholder.com/400x320"; // Default image
  const imageToDisplay = imageUrl || defaultImageUrl;
  return (
    <Card sx={sx}>
        <CardMedia
          sx={{ ...imageStyles }}
          image={imageToDisplay}
          title="Retailer Image"
        />
      {children}
    </Card>
  );
};

export default ActionCard;
