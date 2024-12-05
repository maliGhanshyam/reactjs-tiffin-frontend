import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import OrganisationCardStyles from "./OrganisationCardStyles"; // Import the entire styles object
import { Box, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface CardField {
  label: string;
  value: string | number | undefined;
}

interface OrganisationCardProps {
  title: string;
  description: string;
  fields: CardField[];
  status: string;
  image?: string;
  actions?: {
    label: string;
    color: "primary" | "error";
    onClick: () => void;
  }[];
}

const OrganisationCard: React.FC<OrganisationCardProps> = ({
  title,
  description,
  fields,
  status,
  image,
  actions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

  return (
    <Card sx={OrganisationCardStyles.cardStyles}>
      {image && (
        <CardMedia
          sx={OrganisationCardStyles.cardMediaStyles}
          image={image}
          title={title}
        />
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column", // Stack content vertically
          justifyContent: "space-between",
          flexGrow: 1, // Allow content to grow and push actions to the bottom
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={OrganisationCardStyles.titleStyles}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Box>
          {fields.map((field, index) => {
            if (index === 0 || isExpanded) {
              return (
                <div key={index}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body2" color="text.secondary">
                      <strong>{field.label}:</strong> {field.value}
                    </Typography>
                    {index === 0 && fields.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={toggleExpand}
                        sx={{ ml: 1, my: 0 }}
                      >
                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    )}
                  </Box>
                  {<Divider sx={{ my: 1 }} />}
                </div>
              );
            }
            return null;
          })}
        </Box>

        <Typography
          variant="body2"
          sx={OrganisationCardStyles.statusStyles(status)}
        >
          Status: {status}
        </Typography>
      </CardContent>

      {actions && (
        <CardActions
          sx={{
            marginTop: "auto", // Push CardActions to the bottom
          //  display: "flex",
            //justifyContent: "flex-end", // Align buttons to the right
            ...OrganisationCardStyles.cardActionsStyles,
          }}
        >
          {actions.map((action, index) => (
            <Button
              key={index}
              size="small"
              color={action.color}
              onClick={action.onClick}
              sx={OrganisationCardStyles.buttonStyles(action.color)}
              variant="outlined"
            >
              {action.label}
            </Button>
          ))}
        </CardActions>
      )}
    </Card>
  );
};

export default OrganisationCard;
