import React from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { Group } from "../GroupList";
import { PlayerListItem } from "./PlayerListItem";

interface GroupListItemProps {
  group: Group;
  onDelete: (groupname: string) => void;
  onRenameGroup: (groupname: string) => void;
  onRenamePlayer: (groupname: string, player: string) => void;
}

function openGroup() {
  console.log("open this group");
}

export const GroupListItem: React.FC<GroupListItemProps> = ({
  group,
  onDelete,
  onRenameGroup,
  onRenamePlayer,
}) => {
  const [open, setOpen] = React.useState(false);

  const openPlayers = () => {
    setOpen(!open);
  };

  const handleRenamePlayer = (player: string) => {
    onRenamePlayer(group.groupname, player);
  };

  return (
    <ListItem button onClick={openGroup}>
      <ListItemSecondaryAction>
        <IconButton edge="start" onClick={openPlayers}>
          {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemText primary={group.groupname} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => onRenameGroup(group.groupname)}
          edge="end"
          aria-label="change groupname"
        >
          <EditRoundedIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => onDelete(group.groupname)}
          edge="end"
          aria-label="delete group"
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      </ListItemSecondaryAction>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Players
            </ListSubheader>
          }
        >
          {group.players.map((player) => {
            return (
              <PlayerListItem
                key={player}
                player={player}
                onRename={handleRenamePlayer}
              />
            );
          })}
        </List>
      </Collapse>
    </ListItem>
  );
};
