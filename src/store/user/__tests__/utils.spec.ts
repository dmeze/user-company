import { filterUserNames, handleUpdateUser } from "store/user/utils";

import { User } from "types/user_interfaces";

describe("user utils", () => {
  const state = {
    users: [{ name: "testUser", id: "testId", phone: "testPhone" }],
  };
  it("handleUpdateUser should return users array", () => {
    const newUser = { name: "testUser1", id: "testId", phone: "testPhone" };
    expect(
      handleUpdateUser(state as { users: Array<User> }, newUser as User)
    ).toEqual([newUser]);
  });

  it("filterUserNames should return usernames and ids array", () => {
    const filteredUserNames = [{ name: "testUser", id: "testId" }];
    expect(filterUserNames(state.users as Array<User>)).toEqual(
      filteredUserNames
    );
  });
});
