import configureMockStore from "redux-mock-store";

import {
  getUserNamesSelector,
  getUserSelector,
  getUsersSelector,
  rootUsersSelector,
} from "store/user/users.selector";

const mockStore = configureMockStore();

const id = "testId";
const user = { name: "testUser", id, address: "testAddress" };
const users = [user];
const state = { user: { users }, company: {}, loading: {} };
const names = [{ name: "testUser", id }];

const store = mockStore(state);

describe("user selectors", () => {
  const testState = store.getState();
  it.each`
    testName                  | selector                | expected     | id
    ${"rootUsersSelector"}    | ${rootUsersSelector}    | ${{ users }} | ${null}
    ${"getUsersSelector"}     | ${getUsersSelector}     | ${users}     | ${null}
    ${"getUserSelector"}      | ${getUserSelector}      | ${user}      | ${id}
    ${"getUserNamesSelector"} | ${getUserNamesSelector} | ${names}     | ${null}
  `("$testName", ({ selector, expected, id }) => {
    id
      ? expect(selector(testState, id)(testState)).toEqual(expected)
      : expect(selector(testState)).toEqual(expected);
  });
});
