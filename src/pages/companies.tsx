import { useEffect } from "react";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getCompaniesSelector } from "store/companies/companies.selector/companies.selector";
import { getCompanies } from "store/companies/companies.thunk";

import { COMPANIES_TABLE } from "constants/constants";

const Companies: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const companies = useSelector(getCompaniesSelector);

  return (
    <Layout title="Companies">
      <TableWrapper type={COMPANIES_TABLE} values={companies} />
    </Layout>
  );
};

export default Companies;
