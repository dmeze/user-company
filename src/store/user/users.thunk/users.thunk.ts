import { createUserApi, getUsersApi, updateUserApi } from "api/user";
import { Dispatch } from "redux";
import {
  addNewUserAction,
  setUsers,
  updateUserAction,
  usersError,
} from "store/user/users.action";
import { setLoading } from "store/loading/loading.action";

import { User } from "types/user_interfaces";

export const getUsers = () => async (dispatch: Dispatch) => {
  try {
    const users = await getUsersApi();
    return dispatch(setUsers(users));
  } catch (e: unknown) {
    return dispatch(usersError(e));
  }
};

export const updateUser = (user: User) => async (dispatch: Dispatch) => {
  try {
    await updateUserApi(user).then(() => dispatch(setLoading(false)));
    return dispatch(updateUserAction(user));
  } catch (e: unknown) {
    return dispatch(usersError(e));
  }
};

export const addNewUser = (user: User) => async (dispatch: Dispatch) => {
  try {
    await createUserApi(user).then(() => dispatch(setLoading(false)));
    return dispatch(addNewUserAction(user));
  } catch (e: unknown) {
    return dispatch(usersError(e));
  }
};
