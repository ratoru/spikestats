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
    <Grid container spacing={10} direction="column">
      <Grid
        item
        container
        style={{ height: "100%" }}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center" paragraph>
            {groupname}
          </Typography>
          <Typography variant="h3" align="center">
            Your group has played {games.length}{" "}
            {games.length > 1 ? "games" : "game"}.
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            How did each player's winrate develop over time?
          </Typography>
          <WinPercentage data={getWinPercentage(games, players)} />
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            How many points did each player contribute to?
          </Typography>
          <PlayerPoints data={getPlayerPointsData(games, players)} />
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            A second way of looking at player wins.
          </Typography>
          <PlayerWinsTree data={getPlayerWinsTreeData(games, players)} />
        </Grid>
      </Grid>
      <Grid item container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            How often does the team with the first serve win?
          </Typography>
          <ServePictorial data={getServeData(games)} />
        </Grid>
      </Grid>
    </Grid>
  );
};
