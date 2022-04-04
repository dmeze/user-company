import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";

import Loader from "react-ts-loaders";

import styles from "styles/_app.module.scss";
import { store, wrapper } from "store/store";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        {loading && (
          <Loader type="ring" color="blue" className={styles.loader} />
        )}
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
