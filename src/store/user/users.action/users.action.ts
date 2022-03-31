import { ADD_NEW_USER, SET_USERS, UPDATE_USER, USERS_ERROR } from "../types";
import { User } from "types/user_interfaces";

export const setUsers = (users: Array<User>) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const usersError = (message: unknown) => {
  return {
    type: USERS_ERROR,
    payload: message,
  };
};

export const updateUserAction = (user: User) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const addNewUserAction = (user: User) => {
  return {
    type: ADD_NEW_USER,
    payload: user,
  };
};
