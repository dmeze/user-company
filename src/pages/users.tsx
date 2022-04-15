import { useEffect } from "react";
import type { NextPage } from "next";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useRouter } from "next/router";

import { isEmpty } from "lodash/fp";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getUsersSelector } from "store/user/users.selector";
import { getUsers } from "store/user/users.thunk";

import { USERS_TABLE } from "constants/constants";

const Users: NextPage = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { getState } = useStore();

  useEffect(() => {
    if (isEmpty(getState().user.users)) dispatch(getUsers());
  }, [dispatch, getState]);

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
