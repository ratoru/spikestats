import Head from "next/head";
import React from "react";
import { NextButton } from "../common/nextButton";
import Grid from "@material-ui/core/Grid";

const IndexApp = () => {
  return (
    <div className="container">
      <Head>
        <title>Roundnet-Stats</title>
        <link rel="icon" href="/icons8-beach-ball-64.png" />
      </Head>

      <main>
        <h1 className="title">Welcome to Roundnet-Statistics!</h1>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <NextButton
            header="About"
            body="Find more detailed information here."
            link="/about"
          />

          <NextButton
            header="Code"
            body="Learn about the code behind this web app."
            link="/code"
          />
        </Grid>
      </main>

      <footer>Created by Raphael</footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
export default IndexApp;
