import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { GroupListItem } from "./lists/GroupListItem";
import {
  errorToast,
  groupPlayerSelection,
  groupConfirmation,
} from "../util/swals";
import { Players, Group } from "../util/types";
import { playerVecToMap } from "../util/utils";
import http from "../services/httpService";
import { LoadingAn } from "../components/common/LoadingAn";
import { richAndColorfulTheme } from "../components/layout/themes";

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

interface GroupServer {
  id: string;
  groupname: string;
}
// interface PlayerServer {
//   id: string;
//   playername: string;
// }

export const GroupList: React.FC = () => {
  // Use style
  const classes = useStyles();

  // Store groups in state
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get data from server.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const storedGroups: Group[] = [];
      try {
        // Get user's groups.
        const groupResult = await http.get("/groups");
        const returnedGroups: GroupServer[] = groupResult.data;
        // For each group get the players.
        for (let group of returnedGroups) {
          const playersResult = await http.get(`/players/${group.id}`);
          const playersMap = playerVecToMap(playersResult.data);
          // const returnedPlayers: PlayerServer[] = playersResult.data;
          // const playersMap: Players = new Map(
          //   returnedPlayers.map((play): [string, string] => [
          //     play.id,
          //     play.playername,
          //   ])
          // );
          storedGroups.push({
            id: group.id,
            groupname: group.groupname,
            players: playersMap,
          });
        }
        setGroups(storedGroups);
      } catch (error) {
        errorToast.fire();
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Add a group
  const handleAdd = async () => {
    let newGroup: Group = {
      id: uuidv4(),
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

    groupPlayerSelection(newGroup.groupname)
      .then((createdPlayers) => {
        newGroup.players = createdPlayers;
        return groupConfirmation(newGroup.groupname, newGroup.players);
      })
      .then(async () => {
        const oldGroups = groups;
        // Update UI
        setGroups((groups) => [...groups, newGroup]);
        // Call server
        const serverGroup: GroupServer = {
          id: newGroup.id,
          groupname: newGroup.groupname,
        };
        const serverPlayers = [];
        newGroup.players.forEach((value, key) =>
          serverPlayers.push({
            id: key,
            playername: value,
            group_id: newGroup.id,
          })
        );
        try {
          await http.post("/groups", serverGroup);
          await http.post("/players", serverPlayers);
        } catch (error) {
          errorToast.fire();
          // Revert UI
          setGroups(oldGroups);
        }
      })
      .catch(() => {
        return;
      });
  };

  // Delete a group
  const handleDelete = (groupname: string, id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting ${groupname}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      focusConfirm: false,
      focusCancel: true,
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.value) {
        // Save old state
        const prevGroups = [...groups];
        // Update UI.
        setGroups(
          groups.filter((curGroup) => curGroup.groupname !== groupname)
        );
        // Call backend and revert if error.
        try {
          await http.delete(`/groups/${id}`);
        } catch (error) {
          errorToast.fire({ text: "The group was already deleted." });
          setGroups(prevGroups);
        }
      }
    });
  };

  // Rename a group
  const handleRenameGroup = async (oldName: string, newName: string) => {
    // New name can't be the old name.

    const newGroups: Group[] = [];
    const oldGroups: Group[] = groups;
    let changedGroup: Group;
    for (let curGroup of groups) {
      const curName = curGroup.groupname;
      // Check if the name is unique.
      if (newName === curName) {
        errorToast.fire({ text: "Group name is not unique!" });
        return;
      }
      if (curName === oldName) {
        // Modify old name.
        changedGroup = { ...curGroup, groupname: newName };
        newGroups.push(changedGroup);
      } else {
        newGroups.push(curGroup);
      }
    }
    setGroups(newGroups);
    // Call server here.
    try {
      await http.put("/groups", {
        id: changedGroup.id,
        groupname: changedGroup.groupname,
      });
    } catch (error) {
      errorToast.fire({ text: "Group doesn't exist anymore." });
      setGroups(oldGroups);
    }
  };

  // Rename a player.
  const handleRenamePlayer = async (oldPlayerId: string, newName: string) => {
    // New name can't be the old name.
    const newGroups: Group[] = [];
    let serverPlayer;
    const oldGroups = groups;
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
        newGroups.push({ ...curGroup, players: newPlayers });
        serverPlayer = {
          id: oldPlayerId,
          playername: newName,
          group_id: curGroup.id,
        };
        break;
      }
      newGroups.push({ ...curGroup, players: newPlayers });
    }
    setGroups(newGroups);
    // Call server here.
    try {
      await http.put("/players", serverPlayer);
    } catch (error) {
      errorToast.fire();
      setGroups(oldGroups);
    }
  };

  let content: React.ReactNode;
  if (groups.length == 0) {
    content = (
      <React.Fragment>
        <Typography align="center">
          A group contains players you commonly play with.
          <br />
          Please note that once a group has been created players can't be added
          or deleted. Players can be renamed, though.
          <br />
          By clicking on a group, you can view that group's statistics.
          <br />
          Seems like you have no groups yet. Create one by clicking the button
          below.
        </Typography>
      </React.Fragment>
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
      {isLoading ? (
        <LoadingAn
          type="spin"
          color={`${richAndColorfulTheme.palette.primary.main}`}
        />
      ) : (
        content
      )}
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
