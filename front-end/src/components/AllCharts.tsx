import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Game, Players } from "../util/types";
import {
  getServeData,
  getPlayerPointsData,
  getPlayerWinsTreeData,
  getWinPercentage,
} from "../util/dataFns";

// Need to use browser rendering for all amCharts.
// https://github.com/amcharts/amcharts4/issues/272#issuecomment-646326596
import dynamic from "next/dynamic";

const ServePictorial = dynamic(() => import("./graphs/ServePictorial"), {
  ssr: false,
});

const PlayerPoints = dynamic(() => import("./graphs/PlayerPoints"), {
  ssr: false,
});

const PlayerWinsTree = dynamic(() => import("./graphs/PlayerWinsTree"), {
  ssr: false,
});

const WinPercentage = dynamic(() => import("./graphs/WinPercentage"), {
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
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Your group played {games.length} games so far.
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How did each player's winrate develop over time?
          </Typography>
        </Grid>
        <Grid item>
          <WinPercentage data={getWinPercentage(games, players)} />
        </Grid>
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
            A second way of looking at player wins.
          </Typography>
          <Grid item xs={12}>
            <PlayerWinsTree data={getPlayerWinsTreeData(games, players)} />
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
