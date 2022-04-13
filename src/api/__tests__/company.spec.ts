import {
  createCompanyApi,
  getCompaniesApi,
  updateCompanyApi,
} from "../company";

import {
  CREATE_COMPANY_PATH,
  headers,
  UPDATE_COMPANY_PATH,
} from "../constants";

import { Company } from "types/company_interfaces";

describe("api/company", () => {
  const mockedFetch = jest.fn();
  global.fetch = mockedFetch;

  const company: unknown = { id: "testId", name: "testCompany" };

  const makeExpected = (link: string, method: string, body: unknown) => [
    link,
    { method, headers, body: JSON.stringify(body) },
  ];

  beforeEach(() => mockedFetch.mockReset());

  describe("getCompaniesApi", () => {
    it("should return companies", async () => {
      const companies = [{ name: "testCompany" }];

      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(companies),
        })
      );

      expect(await getCompaniesApi()).toEqual(companies);
    });
  });

  describe("updateCompanyApi", () => {
    it("should return updated company", async () => {
      const expectedBody = {
        ...(company as Company),
        _id: (company as Company).id,
        updatedBy: new Date(),
      };
      const expected = makeExpected(UPDATE_COMPANY_PATH, "PUT", expectedBody);

      await updateCompanyApi(company as Company);

      expect(mockedFetch).toBeCalledWith(...expected);
    });
  });

  describe("createCompanyApi", () => {
    it("should call fetch with newCompany and return it", async () => {
      const expected = makeExpected(CREATE_COMPANY_PATH, "POST", company);
      const newCompany: unknown = { id: "testId", name: "testCompany" };

      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(newCompany),
        })
      );

      await createCompanyApi(company as Company);

      expect(await createCompanyApi(newCompany as Company)).toEqual(newCompany);
      expect(mockedFetch).toBeCalledWith(...expected);
    });
  });
});
