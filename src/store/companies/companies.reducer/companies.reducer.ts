import { AnyAction } from "redux";

import { SET_COMPANIES, UPDATE_COMPANY, UPDATE_COMPANY_LOADER } from "../types";
import { handleUpdateCompany } from "../utils";

const initialState = { companies: [], loading: false };

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
    case UPDATE_COMPANY_LOADER:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
