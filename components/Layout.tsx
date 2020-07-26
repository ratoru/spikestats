import React, { FunctionComponent, Fragment } from "react";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";

interface LayoutProps {
  title: string;
}

export const Layout: FunctionComponent<LayoutProps> = ({ title, children }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/roundnet-logo.svg" />
      </Head>
      <CssBaseline />
      {children}
    </Fragment>
  );
};
