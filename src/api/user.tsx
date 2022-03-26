import { User, Credentials } from "types/user_interfaces";

const camelCaseKeys = require("camelcase-keys");

export const getUserByIdApi = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/users/${id}`);
  return camelCaseKeys(await res.json());
};

export const getUsersApi = async () => {
  const res = await fetch(`http://localhost:3001/api/users/`);
  return camelCaseKeys(await res.json());
};

export const updateUserApi = async (user: User) => {
  user._id = user.id;
  user.updatedBy = new Date();
  await fetch(`http://localhost:3001/api/users/`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(user),
  });
};

export const loginApi = async (credentials: Credentials) => {
  const res = await fetch("http://localhost:3001/api/login/", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  });
  return camelCaseKeys(await res.json());
};
