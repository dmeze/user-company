import { usersReducer } from "store/user/users.reducer";
import {
  addNewUserAction,
  setUsers,
  updateUserAction,
} from "store/user/users.action";

import { ADD_NEW_USER, SET_USERS, UPDATE_USER } from "store/user/types";

import { User } from "types/user_interfaces";

const testUser = { name: "newTestName" };
const newUsers = [testUser];
const initialState = { users: [] };
const users = [{ name: "test user" }];
const testState = { users };

const {
  DEFAULT_STATE_EXPECTED,
  SET_USERS_EXPECTED,
  UPDATE_USER_EXPECTED,
  ADD_NEW_USER_EXPECTED,
} = {
  DEFAULT_STATE_EXPECTED: { users: [] },
  SET_USERS_EXPECTED: { users },
  UPDATE_USER_EXPECTED: { users: newUsers },
  ADD_NEW_USER_EXPECTED: { users: newUsers },
};

jest.mock("store/user/utils", () => ({ handleUpdateUser: () => newUsers }));

describe("users reducer", () => {
  it.each`
    testName           | state           | action                                | expected
    ${"default state"} | ${undefined}    | ${{}}                                 | ${DEFAULT_STATE_EXPECTED}
    ${SET_USERS}       | ${initialState} | ${setUsers(users as User[])}          | ${SET_USERS_EXPECTED}
    ${UPDATE_USER}     | ${testState}    | ${updateUserAction(testUser as User)} | ${UPDATE_USER_EXPECTED}
    ${ADD_NEW_USER}    | ${testState}    | ${addNewUserAction(testUser as User)} | ${ADD_NEW_USER_EXPECTED}
  `(
    "Should update the store according to $testName action",
    ({ state, action, expected }) => {
      expect(usersReducer(state, action)).toEqual(expected);
    }
  );
});
