import { usersReducer } from "store/user/users.reducer";

import { ADD_NEW_USER, SET_USERS, UPDATE_USER } from "store/user/types";

const newUsers = [{ name: "newTestName" }];
const initialState = { users: [] };
const users = [{ name: "test user" }];
const testState = { users };

const {
  DEFAULT_STATE_ACTION,
  SET_USERS_ACTION,
  UPDATE_USER_ACTION,
  ADD_NEW_USER_ACTION,
} = {
  DEFAULT_STATE_ACTION: { type: "default state", payload: {} },
  SET_USERS_ACTION: { type: SET_USERS, payload: users },
  UPDATE_USER_ACTION: {
    type: UPDATE_USER,
    payload: newUsers,
  },
  ADD_NEW_USER_ACTION: {
    type: ADD_NEW_USER,
    payload: newUsers,
  },
};

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
    testName           | state           | action                  | expected
    ${"default state"} | ${undefined}    | ${DEFAULT_STATE_ACTION} | ${DEFAULT_STATE_EXPECTED}
    ${SET_USERS}       | ${initialState} | ${SET_USERS_ACTION}     | ${SET_USERS_EXPECTED}
    ${UPDATE_USER}     | ${testState}    | ${UPDATE_USER_ACTION}   | ${UPDATE_USER_EXPECTED}
    ${ADD_NEW_USER}    | ${testState}    | ${ADD_NEW_USER_ACTION}  | ${ADD_NEW_USER_EXPECTED}
  `("$testName", ({ state, action, expected }) => {
    expect(usersReducer(state, action)).toEqual(expected);
  });
});
