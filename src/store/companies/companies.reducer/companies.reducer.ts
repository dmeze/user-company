import { AnyAction } from "redux";

import {
  ADD_NEW_COMPANY,
  ADD_USER,
  SET_COMPANIES,
  UPDATE_COMPANY,
} from "../types";
import { handleAddCompany, handleUpdateCompany } from "store/companies/utils";

import { Company } from "types/company_interfaces";

const initialState: { companies: Array<Company> } = { companies: [] };

export const companiesReducer = (
  state = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case SET_COMPANIES:
      return {
        ...state,
        companies: payload,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        companies: handleUpdateCompany(state, payload),
      };
    case ADD_USER:
      return {
        ...state,
        companies: handleUpdateCompany(state, payload),
      };
    case ADD_NEW_COMPANY:
      return {
        ...state,
        companies: handleAddCompany(state, payload),
      };
    default:
      return state;
  }
};
