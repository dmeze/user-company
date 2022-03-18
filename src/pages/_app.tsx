import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

import Loader from "react-ts-loaders";

import styles from "styles/_app.module.scss";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <>
      <SessionProvider session={session}>
        {loading && (
          <Loader type="ring" color="blue" className={styles.loader} />
        )}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default MyApp;
