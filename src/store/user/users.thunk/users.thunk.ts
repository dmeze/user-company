import { getUsersApi, updateUserApi } from "api/user";
import { Dispatch } from "redux";
import {
  setUsers,
  updateUserAction,
  updateUserLoader,
  usersError,
} from "store/user/users.action";

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
    await updateUserApi(user).then(() => dispatch(updateUserLoader(false)));
    return dispatch(updateUserAction(user));
  } catch (e: unknown) {
    return dispatch(usersError(e));
  }
};
