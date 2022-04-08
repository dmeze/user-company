import { companiesReducer } from "store/companies/companies.reducer";

import {
  ADD_NEW_COMPANY,
  ADD_USER,
  SET_COMPANIES,
  UPDATE_COMPANY,
} from "store/companies/types";

const newCompanies = [{ companyName: "newTestCompany" }];
const initialState = { companies: [] };
const companies = [{ companyName: "testCompanyName" }];
const testState = { companies };

const {
  DEFAULT_STATE_ACTION,
  SET_COMPANIES_ACTION,
  UPDATE_COMPANY_ACTION,
  ADD_NEW_COMPANY_ACTION,
  ADD_USER_ACTION,
} = {
  DEFAULT_STATE_ACTION: {
    type: "default state",
    payload: {},
  },
  SET_COMPANIES_ACTION: {
    type: SET_COMPANIES,
    payload: companies,
  },
  UPDATE_COMPANY_ACTION: {
    type: UPDATE_COMPANY,
    payload: newCompanies,
  },
  ADD_NEW_COMPANY_ACTION: {
    type: ADD_NEW_COMPANY,
    payload: newCompanies,
  },
  ADD_USER_ACTION: {
    type: ADD_USER,
    payload: newCompanies,
  },
};

const {
  DEFAULT_STATE_EXPECTED,
  SET_COMPANIES_EXPECTED,
  UPDATE_COMPANY_EXPECTED,
  ADD_NEW_COMPANY_EXPECTED,
  ADD_USER_EXPECTED,
} = {
  DEFAULT_STATE_EXPECTED: { companies: [] },
  SET_COMPANIES_EXPECTED: { companies },
  UPDATE_COMPANY_EXPECTED: { companies: newCompanies },
  ADD_NEW_COMPANY_EXPECTED: { companies: newCompanies },
  ADD_USER_EXPECTED: { companies: newCompanies },
};

jest.mock("store/companies/utils", () => ({
  handleUpdateCompany: () => newCompanies,
  handleAddCompany: () => newCompanies,
}));

describe("companies reducer", () => {
  it.each`
    testName           | state           | action                    | expected
    ${"default state"} | ${undefined}    | ${DEFAULT_STATE_ACTION}   | ${DEFAULT_STATE_EXPECTED}
    ${SET_COMPANIES}   | ${initialState} | ${SET_COMPANIES_ACTION}   | ${SET_COMPANIES_EXPECTED}
    ${UPDATE_COMPANY}  | ${testState}    | ${UPDATE_COMPANY_ACTION}  | ${UPDATE_COMPANY_EXPECTED}
    ${ADD_NEW_COMPANY} | ${testState}    | ${ADD_NEW_COMPANY_ACTION} | ${ADD_NEW_COMPANY_EXPECTED}
    ${ADD_USER}        | ${testState}    | ${ADD_USER_ACTION}        | ${ADD_USER_EXPECTED}
  `("$testName", ({ state, action, expected }) => {
    expect(companiesReducer(state, action)).toEqual(expected);
  });
});
