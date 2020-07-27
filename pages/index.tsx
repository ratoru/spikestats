import React from "react";
import Grid from "@material-ui/core/Grid";
import { MyFooter } from "../components/common/MyFooter";
import { LoginForm } from "../components/LoginForm";
import { LogoBar } from "../components/LogoBar";

function IndexPage() {
  return (
    <React.Fragment>
      <LogoBar />
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item>
          <LoginForm header="Login" />
        </Grid>
      </Grid>
      <MyFooter />
    </React.Fragment>
  );
}

export default IndexPage;
