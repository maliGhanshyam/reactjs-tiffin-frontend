import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  innerCardContainerStyleAR: {
    minWidth: 320,
  },
  innerCardContainerStyle: {
    minWidth: 320,
    mr: 2,
  },
  cardMediaStyles: {
    height: 140,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  cardStyles: {
    maxWidth: 350,
    margin: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    marginRight:"20px"
  },
};
