import { AnyAction } from "redux";

import { ADD_USER, SET_COMPANIES, UPDATE_COMPANY } from "../types";
import { handleUpdateCompany } from "../utils";

const initialState = { companies: [] };

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
    default:
      return state;
  }
};
