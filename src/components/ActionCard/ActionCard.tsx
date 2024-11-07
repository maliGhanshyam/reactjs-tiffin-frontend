import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Box,
  } from "@mui/material";
  
  interface Props {
    title: string;
    description: string;
    status: string;
    fields?: { label: string; value: string }[];
    onApprove?: () => void;
    onReject?: () => void;
  }
  
  const ActionCard: React.FC<Props> = ({
    title,
    description,
    status,
    fields = [],
    onApprove,
    onReject,
  }) => {
    return (
      <Card
        sx={{
          maxWidth: 350,
          margin: 2,
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          sx={{ height: 140, borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
          image="https://via.placeholder.com/400x320"
          title={title}
        />
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
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
            <Box sx={{ mt: 2 }}>
              {fields.map((field, index) => (
                <Typography key={index} variant="body2" color="text.secondary">
                  <strong>{field.label}</strong>: {field.value}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
  
        <CardActions sx={{ justifyContent: "center", gap: 2 }}>
          {onApprove && (
            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "success.dark",
                },
              }}
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
              sx={{
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
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
  