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

import { Company } from "types/company_interfaces";

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

describe("store/companies/thunk", () => {
  const store = mockStore({ users: [], companies: [], loading: {} });

  const company = { companyName: "SoftServe" };

  beforeEach(() => store.clearActions());

  describe("getCompanies", () => {
    it(`should call getCompanies api and invoke actions`, async () => {
      getCompaniesApi.mockReturnValue(company);
      setCompanies.mockReturnValue({ type: SET_COMPANIES });

      await store.dispatch<any>(getCompanies());

      expect(setCompanies).toHaveBeenCalledWith(company);
    });

    it(`should return error`, async () => {
      const error = "getCompanies error";
      getCompaniesApi.mockImplementation(() => {
        throw new Error(error);
      });
      companiesError.mockReturnValue({ type: COMPANIES_ERROR });

      await store.dispatch<any>(getCompanies());

      expect(companiesError).toHaveBeenCalledWith(Error(error));
    });
  });

  describe("updateCompany", () => {
    it(`should call updateCompany api and invoke actions`, async () => {
      updateCompanyApi.mockReturnValue(Promise.resolve(company));
      updateCompanyAction.mockReturnValue({ type: UPDATE_COMPANY });
      setLoading.mockReturnValue({ type: SET_LOADING });

      await store.dispatch<any>(updateCompany(company as Company));

      expect(setLoading).toHaveBeenCalledWith(false);
      expect(updateCompanyAction).toHaveBeenCalledWith(company);
    });

    it(`should return error`, async () => {
      const error = "updateCompany error";
      updateCompanyApi.mockImplementation(() => {
        throw new Error(error);
      });
      companiesError.mockReturnValue({ type: COMPANIES_ERROR });

      await store.dispatch<any>(updateCompany(company as Company));

      expect(companiesError).toHaveBeenCalledWith(Error(error));
    });
  });

  describe("addUserToCompany", () => {
    it(`should call addUserToCompany api and invoke actions`, async () => {
      updateCompanyApi.mockReturnValue(company);
      addUser.mockReturnValue({ type: ADD_USER });

      await store.dispatch<any>(addUserToCompany(company as Company));

      expect(addUser).toHaveBeenCalledWith(company);
    });

    it(`should return error`, async () => {
      const error = "addUser error";
      updateCompanyApi.mockImplementation(() => {
        throw new Error(error);
      });
      companiesError.mockReturnValue({ type: COMPANIES_ERROR });

      await store.dispatch<any>(addUserToCompany(company as Company));

      expect(companiesError).toHaveBeenCalledWith(Error(error));
    });
  });

  describe("addNewCompany", () => {
    it(`should call addNewCompany api and invoke actions`, async () => {
      createCompanyApi.mockReturnValue(Promise.resolve(company));
      addNewCompanyAction.mockReturnValue({ type: ADD_NEW_COMPANY });
      setLoading.mockReturnValue({ type: SET_LOADING });

      await store.dispatch<any>(addNewCompany(company as Company));

      expect(setLoading).toHaveBeenCalledWith(false);
      expect(addNewCompanyAction).toHaveBeenCalledWith(company);
    });

    it(`should return error`, async () => {
      const error = "addNewCompany error";
      createCompanyApi.mockImplementation(() => {
        throw new Error(error);
      });
      companiesError.mockReturnValue({ type: COMPANIES_ERROR });

      await store.dispatch<any>(addNewCompany(company as Company));

      expect(companiesError).toHaveBeenCalledWith(Error(error));
    });
  });
});
