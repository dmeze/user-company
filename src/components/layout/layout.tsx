import { useState, MouseEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  DomainAddRounded,
} from "@mui/icons-material";

import Sidebar from "./drawer";
import { AppBar, Main } from "./styled.layout";
import { LayoutProps } from "types/layout_interfaces";

import styles from "styles/layout.module.scss";
import { COMPANIES_PATH } from "constants/constants";
import ModalsController from "components/modalsController/modalsController";
import { ADD_COMPANY } from "components/modalsController/constants";

const Layout = ({ children, title }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openModal, setOpenModal] = useState<{ open: boolean; type: string }>({
    open: false,
    type: "",
  });

  const { data: session } = useSession();

  const { push, pathname } = useRouter();

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

  const handleOpenModal = (type: string) => {
    setOpenModal({ open: true, type });
  };

  const handleCloseModal = (type: string) => {
    setOpenModal({ open: false, type });
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
            {pathname === COMPANIES_PATH && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => handleOpenModal(ADD_COMPANY)}
                  color="inherit"
                >
                  <DomainAddRounded />
                </IconButton>
                <ModalsController
                  handleClose={handleCloseModal}
                  openType={openModal}
                />
              </>
            )}
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
                      push(`/user/${session.id}`);
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>SignOut</MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="contained" onClick={() => signIn()}>
                Sign in
              </Button>
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
