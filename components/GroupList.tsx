import React, { useState } from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import { makeStyles } from "@material-ui/core/styles";
import { GroupListItem } from "./common/GroupListItem";

const handleAdd = () => {
  console.log("New Group!");
};

const handleDelete = (groupname: string) => {
  console.log("Handle delete.", groupname);
};

const handleRenameGroup = (groupname: string) => {
  console.log("Rename this group", groupname);
};

const handleRenamePlayer = (groupname: string, player: string) => {
  console.log("Rename this player", groupname, player);
};

export interface Group {
  groupname: string;
  players: string[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    backgroundColor: theme.palette.success.main,
  },
}));

export const GroupList: React.FC = () => {
  // Use stle
  const classes = useStyles();

  // For testing porpuses.
  const group1: Group = {
    groupname: "Group1",
    players: ["Player 1.1", "Player 1.2", "Player 1.3", "Player 1.4"],
  };
  const group2: Group = {
    groupname: "Group2",
    players: ["Player 2.1", "Player 2.2", "Player 2.3", "Player 2.4"],
  };
  // Use state hook
  const initialGroups: Group[] = [group1, group2];
  const [groups, setGroups] = useState(initialGroups);

  return (
    <React.Fragment>
      <List component="nav" className={classes.root}>
        {groups.map((group) => {
          return (
            <React.Fragment>
              <GroupListItem
                key={group.groupname}
                group={group}
                onDelete={handleDelete}
                onRenameGroup={handleRenameGroup}
                onRenamePlayer={handleRenamePlayer}
              />
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
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
            onClick={handleAdd}
          >
            <GroupAddRoundedIcon />
          </Fab>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
