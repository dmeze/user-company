import Table from "./table";
import { makeCompanyData, makeUserData } from "./utils";
import { companyHeader, companyPath, userHeader, userPath } from "./constants";
import { USERS_TABLE } from "constants/constants";

import { Company } from "types/company_interfaces";
import { User } from "types/user_interfaces";

const TableWrapper = ({
  type,
  values,
  userId,
}: {
  type: string;
  values: Array<User> | Array<Company>;
  userId?: string;
}) => {
  return (
    <Table
      columns={type === USERS_TABLE ? userHeader : companyHeader}
      data={
        type === USERS_TABLE
          ? makeUserData(values as Array<User>)
          : makeCompanyData(values as Array<Company>)
      }
      path={type === USERS_TABLE ? userPath : companyPath}
      userId={userId}
    />
  );
};

export default TableWrapper;
