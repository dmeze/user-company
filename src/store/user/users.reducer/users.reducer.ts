import { AnyAction } from "redux";

import { ADD_NEW_USER, SET_USERS, UPDATE_USER } from "../types";
import { handleUpdateUser } from "../utils";

const initialState = { users: [] };

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
    case ADD_NEW_USER:
      return {
        ...state,
        users: handleUpdateUser(state, payload),
      };
    default:
      return state;
  }
};
