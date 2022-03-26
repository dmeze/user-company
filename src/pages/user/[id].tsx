import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import {
  Email,
  SupervisedUserCircle,
  LocalPhone,
  Apartment,
  Edit,
} from "@mui/icons-material";

import { User } from "types/user_interfaces";
import Layout from "components/layout";
import ModalUser from "components/modals";
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

import styles from "styles/user.module.scss";
import { connect } from "react-redux";
import { getOneUserSelector } from "store/user/users.selector";
import { State } from "store/interfaces";
import { wrapper } from "../../store/store";
import { getUsers } from "../../store/user/users.thunk";

const User: NextPage<{ user: User }> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
            <IconButton aria-label="settings" onClick={handleOpenModal}>
              <Edit />
            </IconButton>
          }
        />
        <ModalUser open={open} handleClose={handleCloseModal} user={user} />
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
    user: getOneUserSelector(state, id)(state)!,
  };
};

export default connect(mapStateToProps)(User);
