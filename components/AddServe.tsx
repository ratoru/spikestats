import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import SentimentVerySatisfiedRoundedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import { Players, Team } from "../util/types";

interface PlayerChip {
  label: string;
  isBlue: boolean;
  isRed: boolean;
  disabled: boolean;
  id: number;
}

interface AddServeProps {
  players: Players;
  teams: { blueTeam: Team; redTeam: Team };
  score: [number, number];
}

export const AddServe: React.FC<AddServeProps> = ({
  players,
  teams,
  score,
}) => {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
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
        <Typography variant="h5" style={{ textAlign: "center" }}>
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
          <Radio
            checked={selectedValue === "blue"}
            onChange={handleChange}
            color="primary"
            checkedIcon={<SportsHandballIcon />}
            value="blue"
            name="blueServe"
            inputProps={{ "aria-label": "Initial serve blue" }}
          />
        </Grid>
        <Grid item>
          <Radio
            checked={selectedValue === "red"}
            onChange={handleChange}
            color="secondary"
            checkedIcon={<SportsHandballIcon />}
            value="red"
            name="redServe"
            inputProps={{ "aria-label": "Initial serve red" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
