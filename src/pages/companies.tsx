import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/layout";
import UnifyTable from "components/table";

import { CompanyProps } from "types/company_interfaces";
import { getCompaniesSelector } from "store/companies/companies.selector/companies.selector";

import { companiesHeader, companyPath } from "../constants";
import { useEffect } from "react";
import { getCompanies } from "../store/companies/companies.thunk";

const CompanyComponent: NextPage<CompanyProps> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const companies = useSelector(getCompaniesSelector);

  return (
    <Layout title="Companies">
      <UnifyTable
        header={companiesHeader}
        rows={companies}
        path={companyPath}
        userId={""}
      />
    </Layout>
  );
};

export default CompanyComponent;
