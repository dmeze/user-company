import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { NextPage } from "next";

import { isEmpty } from "lodash/fp";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getCompaniesSelector } from "store/companies/companies.selector/companies.selector";
import { getCompanies } from "store/companies/companies.thunk";

import { COMPANIES_TABLE } from "constants/constants";

const Companies: NextPage = () => {
  const dispatch = useDispatch();
  const { getState } = useStore();

  useEffect(() => {
    if (isEmpty(getState().company.companies)) dispatch(getCompanies());
  }, [dispatch, getState]);

  const companies = useSelector(getCompaniesSelector);

  return (
    <Layout title="Companies">
      <TableWrapper type={COMPANIES_TABLE} values={companies} />
    </Layout>
  );
};

export default Companies;
