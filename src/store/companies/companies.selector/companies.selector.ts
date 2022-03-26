import { createSelector } from "reselect";
import { State } from "store/interfaces";

const getCompany = (state: State) => state.company;

export const getCompaniesSelector = createSelector(
  getCompany,
  ({ companies }) => companies
);

export const getCompanySelector = (state: State, id: string) => {
  return createSelector(getCompaniesSelector, (companies) => {
    return companies.find((company) => company.id === id)!;
  });
};

export const getLoadingSelector = createSelector(
  getCompany,
  ({ loading }) => loading
);
