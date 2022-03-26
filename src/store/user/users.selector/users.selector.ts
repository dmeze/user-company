import { createSelector } from "reselect";
import { State } from "store/interfaces";
import { filterUserNames } from "store/user/utils";

const getUsers = (state: State) => state.user;

export const getUsersSelector = createSelector(getUsers, ({ users }) => users);

export const getOneUserSelector = (state: State, id: string) => {
  return createSelector(getUsersSelector, (users) => {
    return users.find((user) => user.id === id)!;
  });
};

export const getLoadingSelector = createSelector(
  getUsers,
  ({ loading }) => loading
);

export const getUserNamesSelector = createSelector(
  getUsersSelector,
  (users) => {
    return filterUserNames(users);
  }
);
