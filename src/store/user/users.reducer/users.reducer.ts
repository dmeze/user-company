import { AnyAction } from "redux";

import { ADD_NEW_USER, SET_USERS, UPDATE_USER } from "../types";
import { handleUpdateUser } from "../utils";
import { User } from "types/user_interfaces";

const initialState = { users: [] };

export const usersReducer = (
  state: { users: Array<User> } = initialState,
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
