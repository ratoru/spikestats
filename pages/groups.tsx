import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { MainBar } from "../components/MainBar";
import { GroupList } from "../components/GroupList";

export default function Groups() {
  return (
    <React.Fragment>
      <MainBar />
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Typography align="center" variant="h1">
            My Groups
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GroupList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
