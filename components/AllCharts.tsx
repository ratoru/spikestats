import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Game, Players } from "../util/types";
import { getServeData } from "../util/utils";

// Need to use browser rendering for all amCharts.
// https://github.com/amcharts/amcharts4/issues/272#issuecomment-646326596
import dynamic from "next/dynamic";

const ServePictorial = dynamic(() => import("./graphs/ServePictorial"), {
  ssr: false,
});

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
    <Grid container spacing={4} justify="center" alignItems="baseline">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {groupname}
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How often does the team with the first serve win?
          </Typography>
        </Grid>
        <Grid>
          <ServePictorial data={getServeData(games)} />
        </Grid>
      </Grid>
    </Grid>
  );
};
