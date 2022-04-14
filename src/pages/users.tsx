import { useEffect } from "react";
import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getUsersSelector } from "store/user/users.selector";
import { getUsers } from "store/user/users.thunk";

import { USERS_TABLE } from "constants/constants";

const Users: NextPage = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector(getUsersSelector);

  return (
    <Layout title="Users">
      <TableWrapper
        type={USERS_TABLE}
        values={users}
        userId={query.id as string}
      />
    </Layout>
  );
};

export default Users;
