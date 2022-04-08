import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
  addNewCompany,
  addUserToCompany,
  getCompanies,
  updateCompany,
} from "store/companies/companies.thunk";

import { SET_LOADING } from "store/loading/types";
import {
  COMPANIES_ERROR,
  SET_COMPANIES,
  UPDATE_COMPANY,
  ADD_NEW_COMPANY,
  ADD_USER,
} from "store/companies/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock("api/company");
const {
  getCompaniesApi,
  updateCompanyApi,
  createCompanyApi,
} = require("api/company");

jest.mock("store/loading/loading.action");
const { setLoading } = require("store/loading/loading.action");

jest.mock("store/companies/companies.action");
const {
  setCompanies,
  companiesError,
  updateCompanyAction,
  addNewCompanyAction,
  addUser,
} = require("store/companies/companies.action");

describe("companies thunks", () => {
  const store = mockStore({ users: [], companies: [], loading: {} });

  const company = { companyName: "SoftServe" };

  const {
    GET_COMPANIES,
    UPDATE_COMPANY_DESCRIBE,
    ADD_USER_TO_COMPANY,
    ADD_NEW_COMPANY_DESCRIBE,
  } = {
    GET_COMPANIES: "getCompanies",
    UPDATE_COMPANY_DESCRIBE: "updateCompany",
    ADD_USER_TO_COMPANY: "addUserToCompany",
    ADD_NEW_COMPANY_DESCRIBE: "addNewCompany",
  };

  beforeEach(() => store.clearActions());

  describe.each`
    describeName                | api                 | type               | action                 | thunk               | error                                  | loading
    ${GET_COMPANIES}            | ${getCompaniesApi}  | ${SET_COMPANIES}   | ${setCompanies}        | ${getCompanies}     | ${`${GET_COMPANIES} error`}            | ${false}
    ${UPDATE_COMPANY_DESCRIBE}  | ${updateCompanyApi} | ${UPDATE_COMPANY}  | ${updateCompanyAction} | ${updateCompany}    | ${`${UPDATE_COMPANY_DESCRIBE} error`}  | ${true}
    ${ADD_USER_TO_COMPANY}      | ${updateCompanyApi} | ${ADD_USER}        | ${addUser}             | ${addUserToCompany} | ${`${ADD_USER_TO_COMPANY} error`}      | ${false}
    ${ADD_NEW_COMPANY_DESCRIBE} | ${createCompanyApi} | ${ADD_NEW_COMPANY} | ${addNewCompanyAction} | ${addNewCompany}    | ${`${ADD_NEW_COMPANY_DESCRIBE} error`} | ${true}
  `(
    "$describeName",
    ({ describeName, api, type, action, thunk, error, loading }) => {
      it(`should call ${describeName} api and invoke actions`, async () => {
        loading
          ? api.mockReturnValue(Promise.resolve(company))
          : api.mockReturnValue(company);
        action.mockReturnValue({ type });
        setLoading.mockReturnValue({ type: SET_LOADING });
        await store.dispatch<any>(
          thunk(loading || describeName === ADD_USER_TO_COMPANY ? company : "")
        );
        if (loading) {
          expect(setLoading).toHaveBeenCalledWith(false);
        }
        expect(action).toHaveBeenCalledWith(company);
      });
      it(`${describeName} should return error`, async () => {
        api.mockImplementation(() => {
          throw new Error(error);
        });
        companiesError.mockReturnValue({ type: COMPANIES_ERROR });
        await store.dispatch<any>(thunk());
        expect(companiesError).toHaveBeenCalledWith(Error(error));
      });
    }
  );
});
