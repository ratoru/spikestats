import React from "react";
import ReactLoading from "react-loading";
import Grid from "@material-ui/core/Grid";

export const LoadingAn = ({ type, color }) => (
  <Grid container justify="center" alignItems="center">
    <Grid item>
      <ReactLoading type={type} color={color} height={667} width={375} />
    </Grid>
  </Grid>
);
