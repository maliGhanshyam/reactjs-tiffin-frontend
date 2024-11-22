import React from "react";
import { Card, CardMedia } from "@mui/material";
import { ActionCardProps } from "./ActionCard.types";
import { DEFAULT_IMAGE_CARD } from "../../constants/DEFAULT_IMAGE";

const ActionCard: React.FC<ActionCardProps> = ({
  imageUrl,
  imageStyles,
  children,
  sx = {},
}: ActionCardProps) => {
  const defaultImageUrl = DEFAULT_IMAGE_CARD // Default image
  const imageToDisplay = imageUrl || defaultImageUrl;
  return (
    <Card sx={sx}>
        <CardMedia
          sx={imageStyles}
          image={imageToDisplay}
          title="Retailer Image"
        />
      {children}
    </Card>
  );
};

export default ActionCard;
