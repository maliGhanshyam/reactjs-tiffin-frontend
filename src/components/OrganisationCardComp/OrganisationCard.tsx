import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider"; // Import Divider
import React from "react";

interface OrgLocation {
  loc: string;
  address: string;
  loc_contact: number;
  loc_email: string;
}

interface OrganisationCardProps {
  title: string;
  description: string;
  locations: OrgLocation[]; // Updated to handle multiple addresses
  status: string;
  extraField1?: string; // Optional additional field
  extraField2?: string; // Optional additional field
}

const OrganisationCard: React.FC<OrganisationCardProps> = ({
  title,
  description,
  locations,
  status,
  extraField1,
  extraField2,
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
        {locations.map((loc, index) => (
          <div key={index}>
            <Typography variant="body2" color="text.secondary">
              <strong>Location ({loc.loc}):</strong> {loc.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Contact:</strong> {loc.loc_contact}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Email:</strong> {loc.loc_email}
            </Typography>
            {index < locations.length - 1 && ( // Only add a divider if it's not the last location
              <Divider sx={{ my: 1 }} /> // Add spacing around the divider
            )}
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
        {extraField1 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Extra Field 1:</strong> {extraField1}
          </Typography>
        )}
        {extraField2 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Extra Field 2:</strong> {extraField2}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Update
        </Button>
        <Button size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrganisationCard;
