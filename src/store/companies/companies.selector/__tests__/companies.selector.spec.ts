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
    testName                   | selector                 | arg          | expected         | id
    ${"rootCompaniesSelector"} | ${rootCompaniesSelector} | ${testState} | ${{ companies }} | ${null}
    ${"getCompaniesSelector"}  | ${getCompaniesSelector}  | ${testState} | ${companies}     | ${null}
    ${"getCompanySelector"}    | ${getCompanySelector}    | ${testState} | ${company}       | ${id}
  `("$testName", ({ selector, arg, expected, id }) => {
    id
      ? expect(selector(arg, id)(arg)).toEqual(expected)
      : expect(selector(arg)).toEqual(expected);
  });
});
