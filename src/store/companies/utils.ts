import { Company } from "types/company_interfaces";

export const handleUpdateCompany = (
  { companies }: { companies: Array<Company> },
  company: Company
) => {
  return companies.map((mappedCompany) => {
    return mappedCompany.id === company.id ? company : mappedCompany;
  });
};
