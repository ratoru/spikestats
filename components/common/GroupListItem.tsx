import React from "react";
import { useRouter } from "next/router";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
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
  onRenamePlayer: (oldPlayerId: string, newName: string) => void;
}

export const GroupListItem: React.FC<GroupListItemProps> = ({
  group,
  onDelete,
  onRenameGroup,
  onRenamePlayer,
}) => {
  const router = useRouter();
  // State to control the visibility of the player sublist
  const [open, setOpen] = React.useState(false);
  const openPlayers = () => {
    setOpen(!open);
  };

  // Wrapper for onRename to bind group to player.
  // const handleSpecificPlayer = (oldPlayerId: string, newName: string) => {
  //   onRenamePlayer(group.groupId, oldPlayerId, newName);
  // };

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

  // Navigates to the games page for that group.
  const openGroup = () => {
    router.push("/stats/[groupname]", `/stats/${group.groupname}`);
  };
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
          {Array.from(group.players, ([key, val]) => {
            return (
              <PlayerListItem
                key={key}
                player={{ uuid: key, name: val }}
                onRename={onRenamePlayer}
              />
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </React.Fragment>
  );
};
