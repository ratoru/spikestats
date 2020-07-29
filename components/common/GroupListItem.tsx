import React from "react";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Collapse,
  ButtonGroup,
  Tooltip,
  Divider,
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

// Navigates to the games page for that group.
function openGroup() {
  console.log("open this group");
}

export const GroupListItem: React.FC<GroupListItemProps> = ({
  group,
  onDelete,
  onRenameGroup,
  onRenamePlayer,
}) => {
  // State to control the visibility of the player sublist
  const [open, setOpen] = React.useState(false);
  const openPlayers = () => {
    setOpen(!open);
  };

  // Wrapper for onRename to bind group to player.
  const handleSpecificRename = (player: string) => {
    onRenamePlayer(group.groupname, player);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={openGroup}>
        <ListItemText primary={group.groupname} />
        <ListItemSecondaryAction>
          <ButtonGroup disableElevation variant="text">
            <Tooltip title="Show Players" arrow>
              <Button onClick={openPlayers} aria-label="show players">
                {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
              </Button>
            </Tooltip>
            <Tooltip title="Rename" arrow>
              <Button
                onClick={() => onRenameGroup(group.groupname)}
                aria-label="change groupname"
              >
                <EditRoundedIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <Button
                onClick={() => onDelete(group.groupname)}
                aria-label="delete group"
              >
                <DeleteForeverRoundedIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </ListItemSecondaryAction>
      </ListItem>
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
                onRename={handleSpecificRename}
              />
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </React.Fragment>
  );
};
