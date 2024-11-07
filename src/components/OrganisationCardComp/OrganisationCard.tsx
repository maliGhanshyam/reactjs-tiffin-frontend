import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React from "react";
import { SxProps, Theme } from "@mui/material";

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
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#f9f9f9",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 4,
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      {image && <CardMedia sx={{ height: 140 }} image={image} title={title} />}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {fields.map((field, index) => (
          <div key={index}>
            <Typography variant="body2" color="text.secondary">
              <strong>{field.label}:</strong> {field.value}
            </Typography>
            {index < fields.length - 1 && <Divider sx={{ my: 1 }} />}
          </div>
        ))}

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color:
              status.toLowerCase() === "active"
                ? "success.main"
                : status.toLowerCase() === "pending"
                ? "warning.main"
                : "error.main",
          }}
        >
          Status: {status}
        </Typography>
      </CardContent>

      {actions && (
        <CardActions>
          {actions.map((action, index) => (
            <Button
              key={index}
              size="small"
              color={action.color}
              onClick={action.onClick}
              sx={{
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor:
                    action.color === "primary"
                      ? "primary.main"
                      : "primary.dark",
                  color: "white",
                },
              }}
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
