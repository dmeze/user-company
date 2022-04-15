import { useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import type { NextPage } from "next";
import Link from "next/link";

import { isEmpty } from "lodash/fp";

import Button from "@material-ui/core/Button";

import Layout from "components/layout";
import Search from "components/search";

import { getUsers } from "store/user/users.thunk";
import { getUserNamesSelector } from "store/user/users.selector";

import { Name } from "types/search_interfaces";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { getState } = useStore();

  useEffect(() => {
    if (isEmpty(getState().user.users)) dispatch(getUsers());
  }, [dispatch, getState]);

  const names: Array<Name> = useSelector(getUserNamesSelector);

  return (
    <Layout title="Home">
      <Link passHref href="/companies">
        <Button variant="contained">Go to companies</Button>
      </Link>
      <Search options={names} />
    </Layout>
  );
};

export default Home;
