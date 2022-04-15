import { createSelector } from "reselect";
import { State } from "store/interfaces";
import { filterUserNames } from "store/user/utils";
import { find } from "lodash/fp";

export const rootUsersSelector = (state: State) => state.user;

export const getUsersSelector = createSelector(
  rootUsersSelector,
  ({ users }) => users
);

export const getUserSelector = (state: State, id: string) =>
  createSelector(getUsersSelector, (users) =>
    find((user) => user.id === id, users)
  );

export const getUserNamesSelector = createSelector(
  getUsersSelector,
  (users) => {
    return filterUserNames(users);
  }
);
