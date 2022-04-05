import { Company } from "types/company_interfaces";

const camelCaseKeys = require("camelcase-keys");

export const getCompanyByIdApi = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/companies/${id}`);
  return camelCaseKeys(await res.json());
};

export const getCompaniesApi = async () => {
  const res = await fetch(`http://localhost:3001/api/companies/`);
  return camelCaseKeys(await res.json());
};

export const updateCompanyApi = async (company: Company) => {
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

export const createCompanyApi = async (company: Company) => {
  const res = await fetch("http://localhost:3001/api/companies/", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(company),
  });
  return camelCaseKeys(await res.json());
};
