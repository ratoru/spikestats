import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
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

interface AddScoreField {
  players: Players;
  teams: { blueTeam: Team; redTeam: Team };
  blueScore: number;
  redScore: number;
  onChange: (points: number, isBlue: boolean) => void;
}

export const AddScoreField: React.FC<AddScoreField> = ({
  players,
  teams,
  blueScore,
  redScore,
  onChange,
}) => {
  const [curBlue, setBlue] = useState(blueScore);
  const [curRed, setRed] = useState(redScore);
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
          :
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
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            autoComplete="off"
            label="Score Blue"
            color="primary"
            autoFocus
            value={curBlue}
            error={curBlue < 0 || (curBlue > 0 && curBlue === curRed)}
            onChange={(event) => {
              if (event.target.type === "number") {
                const enteredScore = parseInt(event.target.value);
                onChange(enteredScore, true);
                setBlue(enteredScore);
              } else {
                onChange(0, true);
                setBlue(0);
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            autoComplete="off"
            label="Score Red"
            color="secondary"
            value={curRed}
            error={curRed < 0 || (curRed > 0 && curBlue === curRed)}
            onChange={(event) => {
              if (event.target.type === "number") {
                const enteredScore = parseInt(event.target.value);
                onChange(enteredScore, false);
                setRed(enteredScore);
              } else {
                onChange(0, false);
                setRed(0);
              }
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
