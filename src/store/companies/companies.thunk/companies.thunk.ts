import { Dispatch } from "redux";

import { getCompaniesApi, updateCompanyApi } from "api/company";
import {
  setCompanies,
  companiesError,
  updateCompanyAction,
  updateCompanyLoader,
} from "store/companies/companies.action";
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
      await updateCompanyApi(company).then(() =>
        dispatch(updateCompanyLoader(false))
      );
      return dispatch(updateCompanyAction(company));
    } catch (e: unknown) {
      return dispatch(companiesError(e));
    }
  };
