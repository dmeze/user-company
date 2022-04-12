import { companiesReducer } from "store/companies/companies.reducer";
import {
  addNewCompanyAction,
  addUser,
  setCompanies,
  updateCompanyAction,
} from "store/companies/companies.action";

import {
  ADD_NEW_COMPANY,
  ADD_USER,
  SET_COMPANIES,
  UPDATE_COMPANY,
} from "store/companies/types";

import { Company } from "types/company_interfaces";

const testCompany = { companyName: "newTestCompany" };
const newCompanies = [testCompany];
const initialState = { companies: [] };
const companies = [{ companyName: "testCompanyName" }];
const testState = { companies };

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
    testName           | state           | action                                         | expected
    ${"default state"} | ${undefined}    | ${{}}                                          | ${DEFAULT_STATE_EXPECTED}
    ${SET_COMPANIES}   | ${initialState} | ${setCompanies(companies as Company[])}        | ${SET_COMPANIES_EXPECTED}
    ${UPDATE_COMPANY}  | ${testState}    | ${updateCompanyAction(testCompany as Company)} | ${UPDATE_COMPANY_EXPECTED}
    ${ADD_NEW_COMPANY} | ${testState}    | ${addNewCompanyAction(testCompany as Company)} | ${ADD_NEW_COMPANY_EXPECTED}
    ${ADD_USER}        | ${testState}    | ${addUser(testCompany as Company)}             | ${ADD_USER_EXPECTED}
  `(
    "Should update the store according to $testName action",
    ({ state, action, expected }) => {
      expect(companiesReducer(state, action)).toEqual(expected);
    }
  );
});
