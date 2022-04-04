import { User } from "types/user_interfaces";
import { Company } from "types/company_interfaces";

export const makeUserData = (users: Array<User>) => {
  return users.map((user) => ({
    ...user,
    creator: user.creator.creatorName,
    company: user.company.companyName,
    updatedBy: new Date(user.updatedBy).toLocaleString("en-us"),
  }));
};

export const makeCompanyData = (companies: Array<Company>) => {
  return companies.map((company) => ({
    ...company,
    creator: company.creator.creatorName,
    updatedBy: new Date(company.updatedBy).toLocaleString("en-us"),
  }));
};
