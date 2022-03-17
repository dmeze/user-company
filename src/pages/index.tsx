import type { NextPage } from "next";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Layout from "components/layout";
import Search from "components/search";
import { getUsers } from "api/user";
import { UserProps } from "types/user_interfaces";

import styles from "styles/index.module.scss";

const Home: NextPage<UserProps> = ({ users }) => {
  return (
    <Layout title="Home">
      <div className={styles.main}>
        <Link href="/companies">
          <Button variant="contained">Go to companies</Button>
        </Link>
        <Search options={users} />
      </div>
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

export default Home;
