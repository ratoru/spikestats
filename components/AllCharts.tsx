import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ServePictorial } from "./graphs/ServePictorial";
import { Game, Players } from "../util/types";
import { getServeData } from "../util/utils";

interface AllChartsProps {
  groupname: string | string[];
  games: Game[];
  players: Players;
}

export const AllCharts: React.FC<AllChartsProps> = ({
  groupname,
  games,
  players,
}) => {
  return (
    <Grid container justify="center" alignItems="baseline">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {groupname}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ServePictorial data={getServeData(games)} />
      </Grid>
    </Grid>
  );
};
