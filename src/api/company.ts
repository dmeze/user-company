import { getApi, postApi, putApi } from "./axios";
import { map } from "lodash/fp";

import {
  CREATE_COMPANY_PATH,
  GET_COMPANIES_PATH,
  UPDATE_COMPANY_PATH,
} from "./constants";

import { Company } from "types/company_interfaces";

export const getCompaniesApi = () =>
  getApi(GET_COMPANIES_PATH).then((companies) =>
    map((company) => ({ ...company, id: company._id }), companies)
  );

export const updateCompanyApi = async (company: Company) => {
  company._id = company.id;
  company.updatedBy = new Date();
  putApi(UPDATE_COMPANY_PATH, company);
};

export const createCompanyApi = async (company: Company) => {
  return postApi(CREATE_COMPANY_PATH, company);
};
