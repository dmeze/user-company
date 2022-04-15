import { createSelector } from "reselect";
import { find } from "lodash/fp";

import { State } from "store/interfaces";

export const rootCompaniesSelector = (state: State) => state.company;

export const getCompaniesSelector = createSelector(
  rootCompaniesSelector,
  ({ companies }) => companies
);

export const getCompanySelector = (state: State, id: string) => {
  return createSelector(getCompaniesSelector, (companies) => {
    return find((company) => company.id === id, companies);
  });
};
