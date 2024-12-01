import { SxProps, Theme } from "@mui/material";

export const styles: { [key: string]: SxProps<Theme> } = {
  paginationStyles: {
    display: "flex",
    justifyContent: {xs:"center",sm:"end"},
    mt: 3,
    marginRight: {xs:0,sm:8},
  },
};
