import { Company } from "types/company_interfaces";

const camelCaseKeys = require("camelcase-keys");

export const getCompanyById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/companies/${id}`);
  return camelCaseKeys(await res.json());
};

export const getCompanies = async () => {
  const res = await fetch(`http://localhost:3001/api/companies/`);
  return camelCaseKeys(await res.json());
};

export const updateCompany = async (company: Company) => {
  company._id = company.id;
  company.updatedBy = new Date();
  await fetch(`http://localhost:3001/api/companies/`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(company),
  });
};
