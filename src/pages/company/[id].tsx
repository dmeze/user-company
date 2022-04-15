import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { isEmpty } from "lodash/fp";

import {
  Avatar,
  CardHeader,
  IconButton,
  Card,
  Stack,
  Typography,
  Button,
  CardContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardActions,
} from "@mui/material";
import {
  Business,
  Edit,
  LocalPhone,
  SupervisedUserCircle,
  PersonAddAltRounded,
} from "@mui/icons-material";

import Layout from "components/layout";
import ModalsController from "components/modalsController/modalsController";

import { ADD_USER, EDIT_COMPANY } from "components/modalsController/constants";

import { getCompanies } from "store/companies/companies.thunk";
import { getCompanySelector } from "store/companies/companies.selector";

import { State } from "store/interfaces";
import { Company } from "types/company_interfaces";

import styles from "styles/company.module.scss";

const Company: NextPage<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const { getState } = useStore();

  useEffect(() => {
    if (isEmpty(getState().company.companies)) dispatch(getCompanies());
  }, [dispatch, getState]);

  const company: Company = useSelector((state: State) =>
    getCompanySelector(state, id)(state)
  )!;

  const [open, setOpen] = useState<{ open: boolean; type: string }>({
    open: false,
    type: "",
  });

  const { data: session } = useSession();

  const handleOpenModal = (type: string) => {
    setOpen({ open: true, type });
  };

  const handleCloseModal = (type: string) => {
    setOpen({ open: false, type });
  };

  return (
    <Layout title={`${company.companyName || "Noname"} company`}>
      <Card className={styles.companyCard}>
        <CardHeader
          avatar={
            <Avatar>{`${company.companyName[0]}${company.companyName[1]}`}</Avatar>
          }
          title={company.companyName}
          className={styles.cardHeader}
          action={
            session &&
            session.role === "admin" &&
            session.id === company.creator.id && (
              <>
                <IconButton
                  aria-label="settings"
                  onClick={() => handleOpenModal(ADD_USER)}
                >
                  <PersonAddAltRounded />
                </IconButton>
                <IconButton
                  aria-label="settings"
                  onClick={() => handleOpenModal(EDIT_COMPANY)}
                >
                  <Edit />
                </IconButton>
              </>
            )
          }
        />
        <ModalsController
          value={company}
          handleClose={handleCloseModal}
          openType={open}
        />
        <CardContent className={styles.cardBody}>
          <Stack>
            <Stack direction="row" spacing={2}>
              <div className={styles.textField}>
                <LocalPhone />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  {company.phone}
                </Typography>
              </div>
              <div className={styles.textField}>
                <Business />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  {company.address}
                </Typography>
              </div>
            </Stack>
            <Stack direction="row" spacing={2} className={styles.stack}>
              <div className={styles.textFieldBottom}>
                <SupervisedUserCircle />
                <Typography
                  className={styles.typography}
                  variant="overline"
                  component="div"
                >
                  <Link
                    passHref={true}
                    href={`/user/[id]`}
                    as={`/user/${company.creator.id}`}
                  >
                    <Button variant="text" className={styles.button}>
                      {company.creator.creatorName}
                    </Button>
                  </Link>
                </Typography>
              </div>
              {company.users.length ? (
                <FormControl className={styles.form}>
                  <InputLabel id="labelId" className={styles.companyLabel}>
                    Users
                  </InputLabel>
                  <Select
                    labelId="labelId"
                    label="Users"
                    className={styles.companySelect}
                    value=""
                  >
                    {company.users.map(({ name, id }, index) => (
                      <MenuItem key={index} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                ""
              )}
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          {!company.updatedBy ? (
            <Typography
              className={styles.typography}
              variant="caption"
              component="div"
            >
              {new Date(company.createdBy).toDateString()}
            </Typography>
          ) : (
            <Typography
              className={styles.typography}
              variant="caption"
              component="div"
            >
              {new Date(company.updatedBy).toDateString()}
            </Typography>
          )}
        </CardActions>
      </Card>
    </Layout>
  );
};

export const getServerSideProps = ({ params }: { params: { id: string } }) => {
  return {
    props: {
      id: params.id,
    },
  };
};

export default Company;
