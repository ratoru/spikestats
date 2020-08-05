import React, { useState } from "react";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { GroupListItem } from "./common/GroupListItem";
import { errorToast } from "../util/swals";

export interface Group {
  groupname: string;
  players: string[];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
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
  const [groups, setGroups] = useState([]);

  // Add a group
  const handleAdd = async () => {
    let newGroup: Group = {
      groupname: "",
      players: [],
    };

    // Template for adding players.
    const PlayerSwal = Swal.mixin({
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Next &rarr;",
      footer: "Leave box empty to stop adding players.",
      input: "text",
      inputPlaceholder: "New Name",
      inputValidator: (value) => {
        for (let player of newGroup.players) {
          if (player === value) {
            return "Name is not unique!";
          }
        }
      },
      progressSteps: ["1", "2", "3"],
      currentProgressStep: "1",
    });

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
    let { value: newPlayer, dismiss: reason } = await PlayerSwal.fire({
      title: `Add Player #${newGroup.players.length + 1}`,
      text: `So far you have: ${newGroup.players.join(", ")}`,
    });
    if (reason) {
      return;
    }
    while (newPlayer) {
      newGroup.players.push(`${newPlayer}`);
      const { value: temp, dismiss: curReason } = await PlayerSwal.fire({
        title: `Add Player #${newGroup.players.length + 1}`,
        text: `So far you have: ${newGroup.players.join(", ")}`,
      });
      if (curReason) {
        return;
      }
      newPlayer = temp;
    }

    Swal.fire({
      title: `Group: ${newGroup.groupname}`,
      text: `Players: ${newGroup.players.join(", ")}`,
      icon: "success",
      confirmButtonText: "Finish",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"],
      currentProgressStep: "2",
      preConfirm: () => {
        // If everything went well.
        if (newGroup.groupname !== "" && newGroup.players.length >= 4) {
          setGroups((groups) => [...groups, newGroup]);
          // Call server here.
        } else {
          Swal.fire({
            title: "Something went wrong.",
            text: "Remember: You need at least four players.",
            icon: "error",
          });
        }
      },
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
        newGroups.push({ groupname: newName, players: curGroup.players });
      } else {
        newGroups.push(curGroup);
      }
    }
    setGroups(newGroups);
    // Call server here.
  };

  // Rename a player.
  const handleRenamePlayer = (
    groupname: string,
    oldPlayer: string,
    newPlayer: string
  ) => {
    // New name can't be the old name.
    const newGroups: Group[] = [];
    for (let curGroup of groups) {
      let newPlayers = curGroup.players;
      if (groupname === curGroup.groupname) {
        // Check if the name is unique.
        newPlayers = [];
        for (let player of curGroup.players) {
          if (player === newPlayer) {
            errorToast.fire({ text: "Group name is not unique!" });
            return;
          }
          if (player === oldPlayer) {
            newPlayers.push(newPlayer);
          } else {
            newPlayers.push(player);
          }
        }
        newGroups.push({ groupname: curGroup.groupname, players: newPlayers });
      }
      setGroups(newGroups);
      // Call server here.
    }
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
