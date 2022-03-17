import type { AppProps } from "next/app";
import Router from "next/router";
import { useState } from "react";

import Loader from "react-ts-loaders";

import styles from "styles/_app.module.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <>
      {loading && <Loader type="ring" color="blue" className={styles.loader} />}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
