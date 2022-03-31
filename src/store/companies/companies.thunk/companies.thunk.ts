import { Dispatch } from "redux";

import { getCompaniesApi, updateCompanyApi } from "api/company";
import {
  setCompanies,
  companiesError,
  updateCompanyAction,
  addUser,
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
