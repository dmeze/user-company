import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { NextPage } from "next";
import Link from "next/link";

import Button from "@material-ui/core/Button";

import Layout from "components/layout";
import Search from "components/search";

import { getUsers } from "store/user/users.thunk";
import { getUserNamesSelector } from "store/user/users.selector";

import { Name } from "types/search_interfaces";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const names: Array<Name> = useSelector(getUserNamesSelector);

  return (
    <Layout title="Home">
      <Link href="/companies">
        <Button variant="contained">Go to companies</Button>
      </Link>
      <Search options={names} />
    </Layout>
  );
};

export default Home;
