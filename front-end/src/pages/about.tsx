import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MyHeader } from "../components/common/MyHeader";

export default function About() {
  return (
    <React.Fragment>
      <MyHeader />
      <Grid container spacing={4} justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h1" style={{ textAlign: "center" }}>
            About
          </Typography>
        </Grid>
        <Grid item container spacing={2} justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Welcome</Typography>
            <Typography>
              Hi! This little web app allows you to track your 'Roundnet' games.
              I hope you enjoy it. Please never save any sensitive information
              on this website.
            </Typography>
            <Typography>
              Furthermore, this is a programming project I am working on in my
              free time. You can find the code{" "}
              <a href="https://github.com/ratoru/spikestats">here</a>. If you
              have constructive feedback feel free to contact me.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Constraints</Typography>
            <Typography>
              You'll be logged out every two hours. This web app uses Vercel's
              and Heroku's free plan. This means 1) if no one used the website
              for a long time it will take significantly longer to load. 2) my
              database has a very limited amount of storage. If the database is
              full this website won't work anymore. If you'd like to contribute,
              you're more than welcome to reach out to me.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Privacy</Typography>
            <Typography>
              Never store any sensitive information on this website, i.e. don't
              use your email as a username! I did my best to follow common
              security guidelines, but you shouldn't rely on that.
            </Typography>
            <Typography>
              Please remember your username! There is no way of getting your
              account back if you lose it. I did not use emails because I didn't
              want to bother with security issues.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Contributions</Typography>
            <Typography>
              Special thanks to Christina Joo for helping me with the logo
              design.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
