import type { NextPage } from "next";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Layout from "components/layout";
import TableWrapper from "components/table";

import { getUsersSelector } from "store/user/users.selector";
import { getUsers } from "store/user/users.thunk";
import { State } from "store/interfaces";
import { wrapper } from "store/store";

import { USERS_TABLE } from "constants/constants";

import { User } from "types/user_interfaces";

const Users: NextPage<{ users: Array<User> }> = ({ users }) => {
  const { query } = useRouter();

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch<any>(getUsers());
    return {
      props: {},
    };
  }
);

const mapStateToProps = (state: State) => {
  return {
    users: getUsersSelector(state)!,
  };
};

export default connect(mapStateToProps)(Users);
