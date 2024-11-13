import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { ActionCardProps } from "./ActionCard.types";

const ActionCard: React.FC<ActionCardProps> = ({
  imageUrl,
  imageStyles,
  children,
  sx = {},
}: ActionCardProps) => {
  const defaultImageUrl = "https://via.placeholder.com/400x320"; // Default image
  return (
    <Card sx={sx}>
      {imageUrl && (
        <CardMedia
          sx={{ ...imageStyles }}
          image={imageUrl || defaultImageUrl}
          title="Retailer Image"
        />
      )}

      <CardContent>
        <Box>{children}</Box>
      </CardContent>

      <CardActions>
        {children &&
          React.Children.toArray(children).some(
            (child: any) => child?.type.name === "Button"
          ) && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
              {children}
            </Box>
          )}
      </CardActions>
    </Card>
  );
};

export default ActionCard;
