import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
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
  locations: OrgLocation[];
  status: string;
  extraField1?: string;
  extraField2?: string;
}

const OrganisationCard: React.FC<OrganisationCardProps> = ({
  title,
  description,
  locations,
  status,
  extraField1,
  extraField2,
}) => {
  const extraFields = [
    { label: "Extra Field 1", value: extraField1 },
    { label: "Extra Field 2", value: extraField2 },
  ];

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
            {[
              { label: `Location (${loc.loc}):`, value: loc.address },
              { label: "Contact:", value: loc.loc_contact },
              { label: "Email:", value: loc.loc_email },
            ].map((field, i) => (
              <Typography key={i} variant="body2" color="text.secondary">
                <strong>{field.label}</strong> {field.value}
              </Typography>
            ))}
            {index < locations.length - 1 && <Divider sx={{ my: 1 }} />}
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

        {extraFields.map(
          (field, index) =>
            field.value && (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                <strong>{field.label}</strong> {field.value}
              </Typography>
            )
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
