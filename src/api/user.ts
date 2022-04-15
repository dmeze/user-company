import { User, Credentials } from "types/user_interfaces";
import {
  CREATE_USER_PATH,
  GET_USERS_PATH,
  LOGIN_PATH,
  UPDATE_USER_PATH,
} from "./constants";
import { getApi, postApi, putApi } from "./axios";
import { map } from "lodash/fp";

export const getUsersApi = async () =>
  getApi(GET_USERS_PATH).then((users) =>
    map((user) => ({ ...user, id: user._id }), users)
  );

export const updateUserApi = async (user: User) => {
  user._id = user.id;
  user.updatedBy = new Date();
  putApi(UPDATE_USER_PATH, user);
};

export const loginApi = async (credentials: Credentials) => {
  return postApi(LOGIN_PATH, credentials);
};

export const createUserApi = async (user: User) => {
  return postApi(CREATE_USER_PATH, user);
};
