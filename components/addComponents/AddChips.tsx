import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import SentimentVerySatisfiedRoundedIcon from "@material-ui/icons/SentimentVerySatisfiedRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import { Players, Team } from "../../util/types";

interface PlayerChip {
  label: string;
  isBlue: boolean;
  isRed: boolean;
  disabled: boolean;
  id: number;
}

interface AddChipsProps {
  players: Players;
  teams: { blueTeam: Team; redTeam: Team };
  onSelect: (id: number, isBlue: boolean) => void;
  onDelete: (id: number, isBlue: boolean) => void;
}

function selectChip(oldChip: PlayerChip, allChips: PlayerChip[]): PlayerChip {
  let numBlue = 0;
  let numRed = 0;
  for (let chip of allChips) {
    if (chip.isBlue) {
      numBlue++;
    } else if (chip.isRed) {
      numRed++;
    }
  }
  const isBlue = numBlue < 2;
  const isRed = !isBlue && numRed < 2;
  return { ...oldChip, isBlue: isBlue, isRed: isRed };
}

function needToDisable(allChips: PlayerChip[]): boolean {
  return allChips.filter((chip) => chip.isBlue || chip.isRed).length >= 4;
}

export const AddChips: React.FC<AddChipsProps> = ({
  players,
  teams,
  onSelect,
  onDelete,
}) => {
  const initialChips: PlayerChip[] = [];
  players.forEach((name, id) => {
    initialChips.push({
      label: name,
      isBlue: false,
      isRed: false,
      disabled: false,
      id: id,
    });
  });
  const [chips, setChips] = useState<PlayerChip[]>(initialChips);

  const handleClick = (index: number) => {
    let newChips = [...chips];
    newChips[index] = selectChip(newChips[index], newChips);
    if (needToDisable(newChips)) {
      newChips = newChips.map((chip) => {
        return { ...chip, disabled: !(chip.isBlue || chip.isRed) };
      });
    }
    onSelect(newChips[index].id, newChips[index].isBlue);
    setChips(newChips);
  };

  const handleDelete = (index: number) => {
    let newChips = [...chips];
    onDelete(newChips[index].id, newChips[index].isBlue);
    newChips[index] = { ...newChips[index], isBlue: false, isRed: false };
    if (!needToDisable(newChips)) {
      newChips = newChips.map((chip) => {
        return { ...chip, disabled: false };
      });
    }
    setChips(newChips);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      justify="center"
      alignItems="baseline"
    >
      <Grid item xs={5}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Blue Team
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          :
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Red Team
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
        {chips.map((chip, index) => {
          if (chip.isBlue) {
            return (
              <Grid item key={chip.id}>
                <Chip
                  key={chip.id}
                  color="primary"
                  label={chip.label}
                  icon={<SentimentVerySatisfiedRoundedIcon />}
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
            );
          }
        })}
      </Grid>
      <Grid item xs={2} />
      <Grid
        item
        xs={5}
        container
        spacing={2}
        justify="space-around"
        alignItems="center"
      >
        {chips.map((chip, index) => {
          if (chip.isRed) {
            return (
              <Grid item key={chip.id}>
                <Chip
                  key={chip.id}
                  color="secondary"
                  label={chip.label}
                  icon={<EmojiPeopleRoundedIcon />}
                  onDelete={() => handleDelete(index)}
                />
              </Grid>
            );
          }
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
        {chips.map((chip, index) => {
          if (!(chip.isBlue || chip.isRed)) {
            return (
              <Grid item key={chip.id}>
                <Chip
                  key={chip.id}
                  label={chip.label}
                  icon={<FaceRoundedIcon />}
                  clickable
                  disabled={chip.disabled}
                  onClick={() => handleClick(index)}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};
