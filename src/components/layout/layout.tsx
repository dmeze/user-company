import { useState, MouseEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";

import Sidebar from "./drawer";
import { AppBar, Main } from "./styled.layout";
import { LayoutProps } from "types/layout_interfaces";

import styles from "styles/layout.module.scss";

const Layout = ({ children, title }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: session } = useSession();

  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" open={open}>
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
              sx={{ flexGrow: 1, ...(open && { visibility: "hidden" }) }}
            >
              {title}
            </Typography>
            {session ? (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      router.push(`/user/${session.id}`);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>SignOut</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={() => signIn()}>
                  Sign in
                </Button>
                <Button variant="contained">Sign up</Button>
              </>
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
