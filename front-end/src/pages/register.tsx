import React from "react";
import Grid from "@material-ui/core/Grid";
// import { LogoBar } from "../components/appBars/LogoBar";
import { Logo } from "../components/Logo";
import { LoggedOutMenu } from "../components/menus/LoggedOutMenu";
import { RegisterForm } from "../components/forms/RegisterForm";
import { MyFooter } from "../components/common/MyFooter";
import { withoutAuth } from "../components/authentication/withoutAuth";

export default withoutAuth(function Code() {
  return (
    <React.Fragment>
      <Logo />
      <LoggedOutMenu />
      <div style={{ height: "50px" }} />
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <RegisterForm loginRoute="/groups" apiRoute="/register" />
        </Grid>
        <Grid item>
          <MyFooter />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
