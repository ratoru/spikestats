import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import { MainBar } from "../components/appBars/MainBar";
import { LoggedInMenu } from "../components/menus/LoggedInMenu";
import { Logo } from "../components/Logo";
import { GroupList } from "../components/GroupList";
import { withAuth } from "../components/authentication/withAuth";

export default withAuth(function Groups() {
  return (
    <React.Fragment>
      <Logo />
      <LoggedInMenu />
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Box mt={"20vh"}>
            <Typography align="center" variant="h2">
              Your Groups
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <GroupList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
