import { User } from "types/user_interfaces";

const camelCaseKeys = require("camelcase-keys");

export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/users/${id}`);
  return camelCaseKeys(await res.json());
};

export const getUsers = async () => {
  const res = await fetch(`http://localhost:3001/api/users/`);
  return camelCaseKeys(await res.json());
};

export const updateUser = async (user: User) => {
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
