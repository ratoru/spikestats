import React from "react";
import Grid from "@material-ui/core/Grid";
import { LogoBar } from "../components/appBars/LogoBar";
import { RegisterForm } from "../components/forms/RegisterForm";
import { MyFooter } from "../components/common/MyFooter";

export default function Code() {
  return (
    <React.Fragment>
      <LogoBar />
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <RegisterForm />
        </Grid>
        <Grid item>
          <MyFooter />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
