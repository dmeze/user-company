import { Dispatch } from "redux";

import {
  createCompanyApi,
  getCompaniesApi,
  updateCompanyApi,
} from "api/company";
import {
  setCompanies,
  companiesError,
  updateCompanyAction,
  addUser,
  addNewCompanyAction,
} from "store/companies/companies.action";
import { setLoading } from "store/loading/loading.action";

import { Company } from "types/company_interfaces";

export const getCompanies = () => async (dispatch: Dispatch) => {
  try {
    const companies = await getCompaniesApi();
    return dispatch(setCompanies(companies));
  } catch (e: unknown) {
    return dispatch(companiesError(e));
  }
};

export const updateCompany =
  (company: Company) => async (dispatch: Dispatch) => {
    try {
      await updateCompanyApi(company).then(() => dispatch(setLoading(false)));
      return dispatch(updateCompanyAction(company));
    } catch (e: unknown) {
      return dispatch(companiesError(e));
    }
  };

export const addUserToCompany =
  (company: Company) => async (dispatch: Dispatch) => {
    try {
      await updateCompanyApi(company);
      return dispatch(addUser(company));
    } catch (e: unknown) {
      return dispatch(companiesError(e));
    }
  };

export const addNewCompany =
  (company: Company) => async (dispatch: Dispatch) => {
    try {
      return createCompanyApi(company).then((res) => {
        dispatch(addNewCompanyAction(res));
        dispatch(setLoading(false));
      });
    } catch (e: unknown) {
      return dispatch(companiesError(e));
    }
  };
