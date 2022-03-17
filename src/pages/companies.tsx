import type { NextPage } from "next";

import { CompanyProps } from "types/company_interfaces";
import { getCompanies } from "api/company";
import Layout from "components/layout";
import StickyHeadTable from "../components/table";
import { companiesHeader, companyPath } from "../constants";

const Companies: NextPage<CompanyProps> = ({ companies }) => {
  return (
    <Layout title="Companies">
      <StickyHeadTable
        header={companiesHeader}
        rows={companies}
        path={companyPath}
        userId={""}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      companies: await getCompanies(),
    },
    revalidate: 3,
  };
}

export default Companies;
