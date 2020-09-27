import React from "react";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MyHeader } from "../components/common/MyHeader";
import { richAndColorfulTheme } from "../components/layout/themes";

export default function About() {
  return (
    <React.Fragment>
      <MyHeader withPadding={false} />
      <Grid container>
        <Grid
          item
          container
          xs={12}
          style={{ height: "100vh", background: "ECECEC" }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h1" align="center" paragraph>
              About
            </Typography>
            <Typography variant="h2" align="center">
              <a href="#welcome" style={{ color: "inherit" }}>
                Welcome
              </a>{" "}
              |{" "}
              <a href="#privacy" style={{ color: "inherit" }}>
                Privacy
              </a>{" "}
              |{" "}
              <a href="#constraints" style={{ color: "inherit" }}>
                Constraints
              </a>{" "}
              |{" "}
              <a href="#contributions" style={{ color: "inherit" }}>
                Contributions
              </a>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
            background: `${richAndColorfulTheme.palette.secondary.main}`,
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="welcome">
              <Typography variant="h2" align="center" paragraph>
                Welcome
              </Typography>
            </a>
            <Typography align="center">
              Hi! This little web app allows you to track your 'Roundnet' games.
              I hope you enjoy it. <br />
              Please never save any sensitive information on this website.
            </Typography>
            <Typography align="center">
              Furthermore, this is a programming project I am working on in my
              free time. You can find the code{" "}
              <a href="https://github.com/ratoru/spikestats">here</a>. <br />
              If you have constructive feedback feel free to contact me.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
            background: `${richAndColorfulTheme.palette.primary.main}`,
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="privacy">
              <Typography variant="h2" align="center" paragraph>
                Privacy
              </Typography>
            </a>
            <Typography align="center">
              Never store any sensitive information on this website, i.e. don't
              use your email as a username! <br />I did my best to follow common
              security guidelines, but you shouldn't rely on that.
              <br />
              Please remember your username! There is no way of getting your
              account back if you lose it.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
            background: `${richAndColorfulTheme.palette.error.main}`,
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="constraints">
              <Typography variant="h2" align="center" paragraph>
                Constraints
              </Typography>
            </a>
            <Typography align="center">
              You'll be logged out every two hours.
              <br /> This web app uses Vercel's and Heroku's free plan. This
              means... <br />
              1) if no one used the website for a long time it will take
              significantly longer to load. <br />
              2) my database has a very limited amount of storage. If the
              database is full this website won't work anymore. <br />
              If you'd like to contribute, you're more than welcome to reach out
              to me.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
            background: `${richAndColorfulTheme.palette.info.main}`,
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="contributions">
              <Typography variant="h2" align="center" paragraph>
                Contributions
              </Typography>
            </a>
            <Typography align="center">
              Special thanks to Christina Joo for helping me with the logo
              design.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
            background: "#1a1a1a",
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a href="https://ratoru.com">
              <img src="/RTR-logo-only.svg" alt="Raphael's logo" />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
