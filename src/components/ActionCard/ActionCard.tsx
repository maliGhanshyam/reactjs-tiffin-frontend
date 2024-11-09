import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { Props } from "./ActionCard.types";
import {
  cardStyles,
  cardMediaStyles,
  titleStyles,
  descriptionStyles,
  fieldsBoxStyles,
  cardActionsStyles,
  buttonStyles,
  rejectButtonStyles,
} from "./ActionCard.styles"; 

const ActionCard: React.FC<Props> = ({
  title,
  description,
  status,
  fields = [],
  onApprove,
  onReject,
}) => {
  return (
    <Card sx={cardStyles}>
      <CardMedia
        sx={cardMediaStyles}
        image="https://via.placeholder.com/400x320"
        title={title}
      />
      <CardContent>
        <Typography variant="h6" component="div" sx={titleStyles}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={descriptionStyles}>
          {description}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontWeight: 500,
            color:
              status.toLowerCase() === "approved"
                ? "success.main"
                : status.toLowerCase() === "pending"
                ? "warning.main"
                : "error.main",
          }}
        >
          Status: {status}
        </Typography>

        {fields.length > 0 && (
          <Box sx={fieldsBoxStyles}>
            {fields.map((field, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                <strong>{field.label}</strong>: {field.value}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={cardActionsStyles}>
        {onApprove && (
          <Button
            size="small"
            variant="contained"
            color="success"
            sx={buttonStyles}
            onClick={onApprove}
          >
            Approve
          </Button>
        )}

        {onReject && (
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={rejectButtonStyles}
            onClick={onReject}
          >
            Reject
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ActionCard;
