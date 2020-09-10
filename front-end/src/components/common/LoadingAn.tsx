import React from "react";
import ReactLoading, { LoadingType } from "react-loading";
import Grid from "@material-ui/core/Grid";

interface LoadingAnProps {
  type: LoadingType;
  color: string;
}

export const LoadingAn: React.FC<LoadingAnProps> = ({ type, color }) => (
  <Grid container justify="center" alignItems="center">
    <Grid item>
      <ReactLoading type={type} color={color} width={"30vw"} height={"30vh"} />
    </Grid>
  </Grid>
);
