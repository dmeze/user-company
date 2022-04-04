import type { NextPage } from "next";
import { connect } from "react-redux";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getCompaniesSelector } from "store/companies/companies.selector/companies.selector";
import { getCompanies } from "store/companies/companies.thunk";
import { wrapper } from "store/store";

import { COMPANIES_TABLE } from "constants/constants";

import { CompanyProps } from "types/company_interfaces";
import { State } from "store/interfaces";

const Companies: NextPage<CompanyProps> = ({ companies }) => {
  return (
    <Layout title="Companies">
      <TableWrapper type={COMPANIES_TABLE} values={companies} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch<any>(getCompanies());
    return {
      props: {},
    };
  }
);

const mapStateToProps = (state: State) => {
  return {
    companies: getCompaniesSelector(state)!,
  };
};

export default connect(mapStateToProps)(Companies);
