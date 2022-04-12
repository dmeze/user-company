import {
  setUsers,
  usersError,
  updateUserAction,
  addNewUserAction,
} from "../users.action";
import { ADD_NEW_USER, SET_USERS, UPDATE_USER, USERS_ERROR } from "../../types";

describe("users action", () => {
  const user = { name: "testUser" };
  const users = [user];
  const message = "Error";

  it.each`
    action              | payload    | type
    ${setUsers}         | ${users}   | ${SET_USERS}
    ${usersError}       | ${message} | ${USERS_ERROR}
    ${updateUserAction} | ${user}    | ${UPDATE_USER}
    ${addNewUserAction} | ${user}    | ${ADD_NEW_USER}
  `("Should return $type action object", ({ action, payload, type }) => {
    expect(action(payload)).toEqual({ type, payload });
  });
});
