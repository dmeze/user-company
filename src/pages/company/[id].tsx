import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { connect } from "react-redux";

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
} from "@mui/icons-material";

import Layout from "components/layout";
import ModalCompany from "components/modals/modalCompany";

import { wrapper } from "store/store";
import { State } from "store/interfaces";
import { getCompanySelector } from "store/companies/companies.selector";
import { getCompanies } from "store/companies/companies.thunk";

import { Company } from "types/company_interfaces";

import styles from "styles/user.module.scss";

const Company: NextPage<{ company: Company; companies: Array<Company> }> = ({
  company,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
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
            <IconButton aria-label="settings" onClick={handleOpenModal}>
              <Edit />
            </IconButton>
          }
        />
        <ModalCompany
          open={open}
          handleClose={handleCloseModal}
          company={company}
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
                  <Link href="/user/[id]" as={`/user/${company.creator.id}`}>
                    <Button variant="text" className={styles.button}>
                      {company.creator.creatorName}
                    </Button>
                  </Link>
                </Typography>
              </div>
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
                  {company.users.map(({ name, id }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    await store.dispatch<any>(getCompanies());
    return {
      props: {
        id: context.params!.id,
      },
    };
  }
);

const mapStateToProps = (state: State, { id }: { id: string }) => {
  return {
    company: getCompanySelector(state, id)(state)!,
  };
};

export default connect(mapStateToProps)(Company);
