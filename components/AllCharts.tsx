import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Game, Players } from "../util/types";
import {
  getServeData,
  getPlayerPointsData,
  getPlayerWinsData,
} from "../util/utils";

// Need to use browser rendering for all amCharts.
// https://github.com/amcharts/amcharts4/issues/272#issuecomment-646326596
import dynamic from "next/dynamic";

const ServePictorial = dynamic(() => import("./graphs/ServePictorial"), {
  ssr: false,
});

const PlayerPoints = dynamic(() => import("./graphs/PlayerPoints"), {
  ssr: false,
});

const PlayerWins = dynamic(() => import("./graphs/PlayerWins"), {
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
    <Grid container spacing={5} justify="center" alignItems="baseline">
      <Grid item xs={12}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {groupname}'s Stats!
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How many points did each player contribute to?
          </Typography>
        </Grid>
        <Grid item>
          <PlayerPoints data={getPlayerPointsData(games, players)} />
        </Grid>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How many wins was each player a part of?
          </Typography>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            At the moment it's wins out of total games (including games you
            didn't play in).
          </Typography>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            Drag players across the line to compare their # of wins.
          </Typography>
          <Grid item xs={12}>
            <PlayerWins data={getPlayerWinsData(games, players)} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How often does the team with the first serve win?
          </Typography>
        </Grid>
        <Grid item>
          <ServePictorial data={getServeData(games)} />
        </Grid>
      </Grid>
    </Grid>
  );
};
