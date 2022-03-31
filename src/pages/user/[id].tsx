import { useState } from "react";
import { connect } from "react-redux";

import { NextPage } from "next";
import Link from "next/link";

import {
  Email,
  SupervisedUserCircle,
  LocalPhone,
  Apartment,
  Edit,
} from "@mui/icons-material";
import {
  Card,
  Stack,
  Typography,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  CardActions,
  IconButton,
} from "@mui/material";

import Layout from "components/layout";
import ModalsController from "components/modalsController/modalsController";
import { EDIT_USER } from "components/modalsController/constants";

import { getUserSelector } from "store/user/users.selector";
import { State } from "store/interfaces";
import { wrapper } from "store/store";
import { getUsers } from "store/user/users.thunk";

import { User } from "types/user_interfaces";

import styles from "styles/user.module.scss";

const User: NextPage<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState<{ open: boolean; type: string }>({
    open: false,
    type: "",
  });

  const handleOpenModal = (type: string) => {
    setOpen({ open: true, type });
  };

  const handleCloseModal = (type: string) => {
    setOpen({ open: false, type });
  };

  return (
    <Layout title={`${user.name || "Noname"}`}>
      <Card className={styles.userCard}>
        <CardHeader
          avatar={<Avatar>{`${user.name[0]}${user.surname[0]}`}</Avatar>}
          title={user.name}
          subheader={user.surname}
          className={styles.cardHeader}
          action={
            <IconButton
              aria-label="settings"
              onClick={() => handleOpenModal(EDIT_USER)}
            >
              <Edit />
            </IconButton>
          }
        />
        <ModalsController
          value={user}
          handleClose={handleCloseModal}
          openType={open}
        />
        <CardContent className={styles.cardBody}>
          <Stack direction="row" spacing={2}>
            <Stack spacing={2}>
              <div className={styles.textField}>
                <LocalPhone />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  {user.phone}
                </Typography>
              </div>
              <div className={styles.textField}>
                <Email />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  {user.email}
                </Typography>
              </div>
            </Stack>
            <Stack spacing={2}>
              <div className={styles.textField}>
                <SupervisedUserCircle />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  <Link href="/user/[id]" as={`/user/${user.creator.id}`}>
                    <Button variant="text" className={styles.button}>
                      {user.creator.creatorName}
                    </Button>
                  </Link>
                </Typography>
              </div>
              <div className={styles.textField}>
                <Apartment />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  <Link href="/company/[id]" as={`/company/${user.company.id}`}>
                    <Button variant="text" className={styles.button}>
                      {user.company.companyName}
                    </Button>
                  </Link>
                </Typography>
              </div>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          {!user.updatedBy ? (
            <Typography
              className={styles.typography}
              variant="caption"
              component="div"
            >
              {new Date(user.createdBy).toDateString()}
            </Typography>
          ) : (
            <Typography
              className={styles.typography}
              variant="caption"
              component="div"
            >
              {new Date(user.updatedBy).toDateString()}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch<any>(getUsers());
    return {
      props: {
        id: context.params!.id,
      },
    };
  }
);

const mapStateToProps = (state: State, { id }: { id: string }) => {
  return {
    user: getUserSelector(state, id)(state)!,
  };
};

export default connect(mapStateToProps)(User);
