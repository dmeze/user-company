import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LayoutProps } from "types/layout_interfaces";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import styles from "styles/layout.module.scss";
import Sidebar from "./drawer";

const Main = styled("main", {
  shouldForwardProp: (prop: PropertyKey) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }: any) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-120px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 120px)`,
    marginLeft: `120px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Layout = ({ children, title }: LayoutProps) => {
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ ...(open && { display: "none" }) }}
            >
              {title}
            </Typography>
            {session ? (
              <Typography variant="h6" component="div" sx={{ right: 0 }}>
                <button onClick={() => signOut()}>Sign out</button>
              </Typography>
            ) : (
              <Typography variant="h6" component="div" sx={{ right: 0 }}>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Main open={open} className={styles.main}>
          {children}
        </Main>
      </Box>
    </>
  );
};

export default Layout;
