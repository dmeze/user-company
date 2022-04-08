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
    testName                  | selector                | arg          | expected     | id
    ${"rootUsersSelector"}    | ${rootUsersSelector}    | ${testState} | ${{ users }} | ${null}
    ${"getUsersSelector"}     | ${getUsersSelector}     | ${testState} | ${users}     | ${null}
    ${"getUserSelector"}      | ${getUserSelector}      | ${testState} | ${user}      | ${id}
    ${"getUserNamesSelector"} | ${getUserNamesSelector} | ${testState} | ${names}     | ${null}
  `("$testName", ({ selector, arg, expected, id }) => {
    id
      ? expect(selector(arg, id)(arg)).toEqual(expected)
      : expect(selector(arg)).toEqual(expected);
  });
});
