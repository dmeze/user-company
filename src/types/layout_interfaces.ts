import { ReactNode } from "react";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";

export interface LayoutProps {
  children: ReactNode;
  title: string;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
