import React from "react";
import { LogoBar } from "../components/LogoBar";
import { Fab, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";

const onAdd = () => {
  console.log("New Group!");
};
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    backgroundColor: theme.palette.success.main,
  },
}));

export default function Code() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <LogoBar />
      <Typography variant="h1">My Groups</Typography>
      <Grid
        container
        spacing={0}
        justify="center"
        style={{ minWidth: "100vw" }}
      >
        <Grid item>
          <Fab
            size="large"
            className={classes.fab}
            aria-label="add"
            onClick={onAdd}
          >
            <GroupAddRoundedIcon />
          </Fab>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
