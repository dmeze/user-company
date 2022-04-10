import configureMockStore from "redux-mock-store";

import {
  getCompaniesSelector,
  getCompanySelector,
  rootCompaniesSelector,
} from "store/companies/companies.selector";

const mockStore = configureMockStore();

const id = "testId";
const company = { name: "testUser", id, address: "testAddress" };
const companies = [company];
const state = { user: {}, company: { companies }, loading: {} };

const store = mockStore(state);

describe("companies selectors", () => {
  const testState = store.getState();
  it.each`
    testName                   | selector                 | expected         | id
    ${"rootCompaniesSelector"} | ${rootCompaniesSelector} | ${{ companies }} | ${null}
    ${"getCompaniesSelector"}  | ${getCompaniesSelector}  | ${companies}     | ${null}
    ${"getCompanySelector"}    | ${getCompanySelector}    | ${company}       | ${id}
  `("$testName", ({ selector, expected, id }) => {
    id
      ? expect(selector(testState, id)(testState)).toEqual(expected)
      : expect(selector(testState)).toEqual(expected);
  });
});
