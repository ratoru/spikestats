import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import SentimentVerySatisfiedRoundedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import { Players, Team, ServeTeam } from "../../util/types";

interface AddConfirmProps {
  players: Players;
  teams: { blueTeam: Team; redTeam: Team };
  score: [number, number];
  serve: ServeTeam;
}

export const AddConfirm: React.FC<AddConfirmProps> = ({
  players,
  teams,
  score,
  serve,
}) => {
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="center"
      alignItems="baseline"
    >
      <Grid
        item
        xs={5}
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
      >
        {teams.blueTeam.map((id) => {
          return (
            <Grid item key={id}>
              <Chip
                key={id}
                color="primary"
                label={players.get(id)}
                icon={<SentimentVerySatisfiedRoundedIcon />}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {score[0]}:{score[1]}
        </Typography>
      </Grid>
      <Grid
        item
        xs={5}
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
      >
        {teams.redTeam.map((id) => {
          return (
            <Grid item key={id}>
              <Chip
                key={id}
                color="secondary"
                label={players.get(id)}
                icon={<EmojiPeopleRoundedIcon />}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <Typography
            variant="subtitle1"
            display="inline"
            color={serve ? "secondary" : "primary"}
          >
            {serve ? "Red" : "Blue"} Serve <SportsHandballIcon />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
