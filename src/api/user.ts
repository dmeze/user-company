import { User, Credentials } from "types/user_interfaces";
import {
  CREATE_USER_PATH,
  GET_USERS_PATH,
  headers,
  LOGIN_PATH,
  UPDATE_USER_PATH,
} from "./constants";

const camelCaseKeys = require("camelcase-keys");

export const getUsersApi = async () => {
  const res = await fetch(GET_USERS_PATH);
  return camelCaseKeys(await res.json());
};

export const updateUserApi = async (user: User) => {
  user._id = user.id;
  user.updatedBy = new Date();
  await fetch(UPDATE_USER_PATH, {
    method: "PUT",
    headers,
    body: JSON.stringify(user),
  });
};

export const loginApi = async (credentials: Credentials) => {
  const res = await fetch(LOGIN_PATH, {
    method: "POST",
    headers,
    body: JSON.stringify(credentials),
  });
  return camelCaseKeys(await res.json());
};

export const createUserApi = async (user: User) => {
  const res = await fetch(CREATE_USER_PATH, {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });
  return camelCaseKeys(await res.json());
};
