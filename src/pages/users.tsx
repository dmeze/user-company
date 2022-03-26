import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "components/layout";
import UnifyTable from "components/table";

import { getUsersSelector } from "store/user/users.selector";
import { getUsers } from "store/user/users.thunk";
import { User } from "types/user_interfaces";

import { usersHeader, userPath } from "../constants";

const Users: NextPage = () => {
  const { query } = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users: Array<User> = useSelector(getUsersSelector);

  return (
    <Layout title="Users">
      <UnifyTable
        header={usersHeader}
        rows={users}
        path={userPath}
        userId={query.id}
      />
    </Layout>
  );
};

export default Users;
