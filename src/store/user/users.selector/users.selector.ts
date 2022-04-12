import { createSelector } from "reselect";
import { State } from "store/interfaces";
import { filterUserNames } from "store/user/utils";

export const rootUsersSelector = (state: State) => state.user;

export const getUsersSelector = createSelector(
  rootUsersSelector,
  ({ users }) => users
);

export const getUserSelector = (state: State, id: string) => {
  return createSelector(getUsersSelector, (users) => {
    return users.find((user) => user.id === id)!;
  });
};

export const getUserNamesSelector = createSelector(
  getUsersSelector,
  (users) => {
    return filterUserNames(users);
  }
);
