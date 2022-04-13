import { Company } from "types/company_interfaces";
import {
  CREATE_COMPANY_PATH,
  GET_COMPANIES_PATH,
  headers,
  UPDATE_COMPANY_PATH,
} from "./constants";

const camelCaseKeys = require("camelcase-keys");

export const getCompaniesApi = async () => {
  const res = await fetch(GET_COMPANIES_PATH);
  return camelCaseKeys(await res.json());
};

export const updateCompanyApi = async (company: Company) => {
  company._id = company.id;
  company.updatedBy = new Date();
  await fetch(UPDATE_COMPANY_PATH, {
    method: "PUT",
    headers,
    body: JSON.stringify(company),
  });
};

export const createCompanyApi = async (company: Company) => {
  const res = await fetch(CREATE_COMPANY_PATH, {
    method: "POST",
    headers,
    body: JSON.stringify(company),
  });
  return camelCaseKeys(await res.json());
};
