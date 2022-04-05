import { Company } from "types/company_interfaces";
import {
  SET_COMPANIES,
  UPDATE_COMPANY,
  COMPANIES_ERROR,
  ADD_USER,
  ADD_NEW_COMPANY,
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

export const addUser = (company: Company) => {
  return {
    type: ADD_USER,
    payload: company,
  };
};

export const addNewCompanyAction = (company: Company) => {
  return {
    type: ADD_NEW_COMPANY,
    payload: company,
  };
};
