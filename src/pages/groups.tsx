import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { MainBar } from "../components/MainBar";
import { GroupList } from "../components/GroupList";

export default function Groups() {
  return (
    <React.Fragment>
      <MainBar />
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item xs={12}>
          <Box mt={4}>
            <Typography align="center" variant="h2">
              My Groups
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <GroupList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}