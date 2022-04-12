import {
  addNewCompanyAction,
  addUser,
  companiesError,
  setCompanies,
  updateCompanyAction,
} from "store/companies/companies.action";

import {
  ADD_NEW_COMPANY,
  ADD_USER,
  COMPANIES_ERROR,
  SET_COMPANIES,
  UPDATE_COMPANY,
} from "store/companies/types";

describe("companies action", () => {
  const company = { companyName: "testCompany" };
  const companies = [company];
  const message = "Error";

  it.each`
    action                 | payload      | type
    ${setCompanies}        | ${companies} | ${SET_COMPANIES}
    ${companiesError}      | ${message}   | ${COMPANIES_ERROR}
    ${updateCompanyAction} | ${company}   | ${UPDATE_COMPANY}
    ${addNewCompanyAction} | ${company}   | ${ADD_NEW_COMPANY}
    ${addUser}             | ${company}   | ${ADD_USER}
  `("Should return $type action", ({ action, payload, type }) => {
    expect(action(payload)).toEqual({ type, payload });
  });
});
