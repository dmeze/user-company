import type { NextPage } from "next";

import { getUsers } from "api/user";
import Layout from "components/layout";
import StickyHeadTable from "../components/table";

import { usersHeader, userPath } from "../constants";
import { UserProps } from "types/user_interfaces";
import { useRouter } from "next/router";

const Users: NextPage<UserProps> = ({ users }) => {
  const { query } = useRouter();

  return (
    <Layout title="Users">
      <StickyHeadTable
        header={usersHeader}
        rows={users}
        path={userPath}
        userId={query.id}
      />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      users: await getUsers(),
    },
    revalidate: 3,
  };
}

export default Users;
