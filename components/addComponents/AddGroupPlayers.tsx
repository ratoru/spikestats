import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Players, Team } from "../../util/types";

interface AddGroupPlayersProps {
  players: Players;
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export const AddGroupPlayers: React.FC<AddGroupPlayersProps> = ({
  players,
  onAdd,
  onDelete,
}) => {
  const [input, setInput] = useState("");
  const [chips, setChips] = useState<string[]>([]);

  const handleClick = () => {
    onAdd(input);
    const newChips = [...chips, input];
    setInput("");
    setChips(newChips);
  };

  const handleDelete = (key: string) => {
    const playerName = players.get(key);
    onDelete(key);
    // Call this to rerender. Not ideal.
    setInput("");
    setChips(
      chips.filter((chip) => {
        return playerName !== chip;
      })
    );
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="center"
      alignItems="baseline"
    >
      <Grid item xs={12}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Add Players
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
      >
        {Array.from(players, ([key, val]) => {
          return (
            <Grid item key={key}>
              <Chip
                key={key}
                label={val}
                icon={<FaceRoundedIcon />}
                onDelete={() => handleDelete(key)}
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
            type="text"
            autoComplete="off"
            label="New Player"
            color="primary"
            helperText="Name has to be unique."
            autoFocus
            value={input}
            error={chips.indexOf(input) !== -1 || input.length === 0}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddRoundedIcon />}
            disabled={chips.indexOf(input) !== -1 || input.length === 0}
            onClick={() => handleClick()}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
