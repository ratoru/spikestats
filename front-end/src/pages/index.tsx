import React from "react";
import Grid from "@material-ui/core/Grid";
import { MyFooter } from "../components/common/MyFooter";
import { LoginForm } from "../components/forms/LoginForm";
import { MyHeader } from "../components/common/MyHeader";
import { withoutAuth } from "../components/authentication/withoutAuth";

export default withoutAuth(function IndexPage() {
  return (
    <React.Fragment>
      <MyHeader isLoggedIn={false} />
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <LoginForm
            header="Login"
            loginRoute="/groups"
            registerRoute="/register"
            apiRoute="/login"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
