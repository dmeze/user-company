import { AnyAction } from "redux";
import { SET_LOADING } from "../types";

const initialState = { loading: false };

export const loadingReducer = (
  state = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
