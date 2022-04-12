import { handleAddCompany, handleUpdateCompany } from "store/companies/utils";

import { Company } from "types/company_interfaces";

describe("store/companies/utils", () => {
  const state = {
    companies: [
      { companyName: "testCompany", id: "testId", phone: "testPhone" },
    ],
  };
  const newCompany = {
    companyName: "testCompany1",
    id: "testId",
    phone: "testPhone",
  };

  describe("handleUpdateCompany", () => {
    it("Should return companies array", () => {
      expect(
        handleUpdateCompany(
          state as { companies: Array<Company> },
          newCompany as Company
        )
      ).toEqual([newCompany]);
    });
  });

  describe("handleAddCompany", () => {
    it("Should add company to companies array", () => {
      const expectedState = [...state.companies, newCompany];
      expect(
        handleAddCompany(
          state as { companies: Array<Company> },
          newCompany as Company
        )
      ).toEqual(expectedState);
    });
  });
});
