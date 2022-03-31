import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/layout";
import UnifyTable from "components/table";

import { getCompaniesSelector } from "store/companies/companies.selector/companies.selector";
import { getCompanies } from "store/companies/companies.thunk";

import { companiesHeader, companyPath } from "constants/constants";

import { CompanyProps } from "types/company_interfaces";

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
