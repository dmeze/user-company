import { AnyAction } from "redux";

import { SET_USERS, UPDATE_USER, UPDATE_USER_LOADING } from "../types";
import { handleUpdateUser } from "../utils";

const initialState = { users: [], loading: false };

export const usersReducer = (
  state = initialState,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        users: handleUpdateUser(state, payload),
      };
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
