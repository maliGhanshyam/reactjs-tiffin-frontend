import { SxProps, Theme } from "@mui/material";

export interface ActionCardProps{
  children:React.ReactNode;
  sx?:SxProps<Theme>
  imageUrl?: string; 
  imageStyles?: SxProps<Theme>;
}