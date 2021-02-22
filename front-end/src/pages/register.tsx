import React from "react";
import Grid from "@material-ui/core/Grid";
import { MyHeader } from "../components/common/MyHeader";
import { RegisterForm } from "../components/forms/RegisterForm";
import { withoutAuth } from "../components/authentication/withoutAuth";

export default withoutAuth(function Code() {
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
          <RegisterForm loginRoute="/groups" apiRoute="/register" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
