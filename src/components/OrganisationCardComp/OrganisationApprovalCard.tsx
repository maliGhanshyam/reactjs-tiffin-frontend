import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

interface OrganisationCardProps {
  title: string;
  description: string;
  location: string;
  status: string;
}

const OrganisationApprovalCard: React.FC<OrganisationCardProps> = ({
  title,
  description,
  location,
  status,
}) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="https://via.placeholder.com/400x320"
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Location: {location}
        </Typography>
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
      <CardActions>
        <Button size="small" color="primary">
          Approve
        </Button>
        <Button size="small" color="error">
          Reject
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrganisationApprovalCard;
