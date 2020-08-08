import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Game, Players } from "../util/types";
import {
  getServeData,
  getPlayerPointsData,
  getPlayerWinsData,
  getWinPercentage,
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
            Compare individual team compositions.
          </Typography>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            Hover over a slice. The number in parantheses shows their win
            percentage. That's games won / games played. (Not total games.)
          </Typography>
          <Typography variant="subtitle1" style={{ textAlign: "center" }}>
            Drag players across the line to compare their win percentage.
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
