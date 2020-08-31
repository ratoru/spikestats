import React from "react";
import Grid from "@material-ui/core/Grid";
import { MyFooter } from "../components/common/MyFooter";
import { LoginForm } from "../components/forms/LoginForm";
import { LogoBar } from "../components/appBars/LogoBar";

function IndexPage() {
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
          <LoginForm
            header="Login"
            loginRoute="/groups"
            registerRoute="/register"
          />
        </Grid>
        <Grid item>
          <MyFooter />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default IndexPage;
