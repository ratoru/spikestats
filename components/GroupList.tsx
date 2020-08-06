import React, { useState } from "react";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { GroupListItem } from "./common/GroupListItem";
import {
  errorToast,
  groupPlayerSelection,
  groupConfirmation,
} from "../util/swals";
import { Players } from "../util/types";

export interface Group {
  groupname: string;
  groupId: string;
  players: Players;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  fabButton: {
    position: "absolute",
    bottom: theme.spacing(5),
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export const GroupList: React.FC = () => {
  // Use style
  const classes = useStyles();

  // Use state hook
  const [groups, setGroups] = useState<Group[]>([]);

  // Add a group
  const handleAdd = async () => {
    let newGroup: Group = {
      groupId: uuidv4(),
      groupname: "",
      players: new Map(),
    };

    // Ask for new group name.
    const { value: newGroupname } = await Swal.fire({
      title: "New Group Name",
      text: "Must be a unique group name.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Next &rarr;",
      input: "text",
      inputPlaceholder: "New group name",
      inputValidator: (value) => {
        if (!value) {
          return "Enter a name.";
        }
        for (let group of groups) {
          if (group.groupname === value) {
            return "Name is not unique!";
          }
        }
      },
      progressSteps: ["1", "2", "3"],
      currentProgressStep: "0",
    });
    if (!newGroupname) {
      return;
    }
    newGroup.groupname = `${newGroupname}`;

    // Add Players until "" is returned.
    groupPlayerSelection(newGroup.groupname)
      .then((createdPlayers) => {
        newGroup.players = createdPlayers;
        return groupConfirmation(newGroup.groupname, newGroup.players);
      })
      .then(() => {
        setGroups((groups) => [...groups, newGroup]);
        // Call server
      })
      .catch(() => {
        return;
      });
  };

  // Delete a group
  const handleDelete = (groupname: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting ${groupname}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      focusConfirm: false,
      focusCancel: true,
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        // Save old state
        const prevGroups = [...groups];
        // Update UI.
        setGroups(
          groups.filter((curGroup) => curGroup.groupname !== groupname)
        );
        console.log(",Handle delete.", groupname, groups);
        // Call backend and revert if error.
        const apiSuccess = true;
        if (!apiSuccess) {
          errorToast.fire({ text: "The group was already deleted." });
          setGroups(prevGroups);
        }
      }
    });
  };

  // Rename a group
  const handleRenameGroup = (oldName: string, newName: string) => {
    // New name can't be the old name.

    const newGroups: Group[] = [];
    for (let curGroup of groups) {
      const curName = curGroup.groupname;
      // Check if the name is unique.
      if (newName === curName) {
        errorToast.fire({ text: "Group name is not unique!" });
        return;
      }
      if (curName === oldName) {
        // Modify old name.
        newGroups.push({ ...curGroup, groupname: newName });
      } else {
        newGroups.push(curGroup);
      }
    }
    setGroups(newGroups);
    // Call server here.
  };

  // Rename a player.
  const handleRenamePlayer = (oldPlayerId: string, newName: string) => {
    // New name can't be the old name.
    const newGroups: Group[] = [];
    for (let curGroup of groups) {
      let newPlayers = new Map(curGroup.players);
      if (newPlayers.has(oldPlayerId)) {
        // Check if the name is unique.
        let isDuplicate = false;
        Array.from(newPlayers, ([key, value]) => {
          if (key !== oldPlayerId && newName === value) {
            errorToast.fire({ text: "Player name is not unique!" });
            isDuplicate = true; // I don't think you can return from here.
          }
        });
        if (isDuplicate) {
          return;
        }
        newPlayers.set(oldPlayerId, newName);
      }
      newGroups.push({ ...curGroup, players: newPlayers });
    }
    setGroups(newGroups);
    // Call server here.
  };

  let content: React.ReactNode;
  if (groups.length == 0) {
    content = (
      <Typography align="center">
        Seems like you have no groups yet. Create one by clicking the button
        below.
      </Typography>
    );
  } else {
    content = (
      <List component="nav" className={classes.root}>
        {groups.map((group) => {
          return (
            <GroupListItem
              key={group.groupname}
              group={group}
              onDelete={handleDelete}
              onRenameGroup={handleRenameGroup}
              onRenamePlayer={handleRenamePlayer}
            />
          );
        })}
      </List>
    );
  }
  return (
    <React.Fragment>
      {content}
      <Tooltip title="New Group" arrow placement="top">
        <Fab
          size="large"
          className={classes.fabButton}
          aria-label="add"
          color="secondary"
          onClick={handleAdd}
        >
          <GroupAddRoundedIcon />
        </Fab>
      </Tooltip>
    </React.Fragment>
  );
};
