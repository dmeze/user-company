import { State } from "store/interfaces";
import { createSelector } from "reselect";

const getLoading = (state: State) => state.loading;

export const getLoadingSelector = createSelector(
  getLoading,
  ({ loading }) => loading
);
