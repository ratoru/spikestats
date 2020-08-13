import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FaceRoundedIcon from "@material-ui/icons/FaceRounded";
import { Players } from "../../util/types";

interface GroupConfirmProps {
  groupname: string;
  players: Players;
}

export const GroupConfirm: React.FC<GroupConfirmProps> = ({
  players,
  groupname,
}) => {
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
          {groupname}
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
              <Chip key={key} label={val} icon={<FaceRoundedIcon />} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
