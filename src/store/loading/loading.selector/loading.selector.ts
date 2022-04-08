import { State } from "store/interfaces";
import { createSelector } from "reselect";

export const loadingRootSelector = (state: State) => state.loading;

export const getLoadingSelector = createSelector(
  loadingRootSelector,
  ({ loading }) => loading
);
