import { map, concat } from "lodash/fp";

import { Company } from "types/company_interfaces";

export const handleUpdateCompany = (
  { companies }: { companies: Array<Company> },
  company: Company
) => {
  map(
    (mappedCompany) =>
      mappedCompany.id === company.id ? company : mappedCompany,
    companies
  );
};

export const handleAddCompany = (
  { companies }: { companies: Array<Company> },
  company: Company
) => concat(companies, company);
