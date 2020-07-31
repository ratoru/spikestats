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
  Typography,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ExpandLessRounded from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRounded from "@material-ui/icons/ExpandMoreRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { Group } from "../GroupList";
import { PlayerListItem } from "./PlayerListItem";
import { FormikListItem } from "./FormikListItem";

interface GroupListItemProps {
  group: Group;
  onDelete: (groupname: string) => void;
  onRenameGroup: (oldName: string, newName: string) => void;
  onRenamePlayer: (groupname: string, oldPlayer: string, newPlayer) => void;
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
  const handleSpecificPlayer = (oldPlayer: string, newPlayer: string) => {
    onRenamePlayer(group.groupname, oldPlayer, newPlayer);
  };

  // State to control editing of groupname.
  const [editing, setEdit] = React.useState(false);

  const handleGroupRename = (values: { newName: string }): void => {
    setEdit(!editing);
    onRenameGroup(group.groupname, values.newName);
  };

  const onCancel = () => {
    setEdit(!editing);
  };

  const editMode = (
    <FormikListItem
      initialValue={group.groupname}
      label="Group Name"
      onSubmit={handleGroupRename}
      onCancel={onCancel}
      onClickAway={() => setEdit(false)}
    />
  );

  const normalMode = (
    <ListItem button onClick={openGroup}>
      <ListItemText primary={<Typography>{group.groupname}</Typography>} />
      <ListItemSecondaryAction>
        <ButtonGroup disableElevation variant="text">
          <Tooltip title="Show Players" arrow>
            <Button onClick={openPlayers} aria-label="show players">
              {open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            </Button>
          </Tooltip>
          <Tooltip title="Rename" arrow>
            <Button
              onClick={() => setEdit(!editing)}
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
  );

  const content = editing ? editMode : normalMode;
  return (
    <React.Fragment>
      {content}
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
                onRename={handleSpecificPlayer}
              />
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </React.Fragment>
  );
};
