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
            <Typography>
              Hi! This little web app allows you to track your 'Roundnet' games.
              I hope you enjoy it. Please never save any sensitive information
              on this website.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Furthermore, this is a programming project I am working on in my
              free time. You can find the code{" "}
              <a href="https://github.com/raphtorru/spike-stats">here</a>. If
              you have constructive feedback feel free to contact me.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Please remember your username! There is no way of getting your
              account back if you lose it. I did not use emails because I didn't
              want to bother with security issues.
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
