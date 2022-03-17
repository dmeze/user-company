import { NextPage } from "next";

import { Company, CompanyStaticProps } from "types/company_interfaces";
import { getCompanies, getCompanyById } from "api/company";
import Layout from "components/layout";
import styles from "styles/user.module.scss";
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
import { useState } from "react";
import Link from "next/link";
import ModalCompany from "components/modals/modalCompany";

const Company: NextPage<{ company: Company; companies: Array<Company> }> = ({
  company,
  companies,
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
          companies={companies}
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

export async function getStaticPaths() {
  const companies = await getCompanies();
  const paths = companies.map((company: Company) => ({
    params: { id: company.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: CompanyStaticProps) {
  return {
    props: {
      company: await getCompanyById(params.id),
      companies: await getCompanies(),
    },
    revalidate: 360,
  };
}

export default Company;
