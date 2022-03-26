import { Company } from "types/company_interfaces";
import {
  SET_COMPANIES,
  UPDATE_COMPANY,
  UPDATE_COMPANY_LOADER,
  COMPANIES_ERROR,
} from "../types";

export const setCompanies = (companies: Array<Company>) => {
  return {
    type: SET_COMPANIES,
    payload: companies,
  };
};

export const companiesError = (message: unknown) => {
  return {
    type: COMPANIES_ERROR,
    payload: message,
  };
};

export const updateCompanyAction = (company: Company) => {
  return {
    type: UPDATE_COMPANY,
    payload: company,
  };
};

export const updateCompanyLoader = (loading: boolean) => {
  return {
    type: UPDATE_COMPANY_LOADER,
    payload: loading,
  };
};
