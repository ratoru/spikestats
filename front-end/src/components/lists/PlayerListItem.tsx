import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SportsHandballRoundedIcon from "@material-ui/icons/SportsHandballRounded";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormikListItem } from "./FormikListItem";
import { Player } from "../../util/types";

interface PlayerListItemProps {
  player: Player;
  onRename: (oldPlayerId: string, newName: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export const PlayerListItem: React.FC<PlayerListItemProps> = ({
  player,
  onRename,
}) => {
  const classes = useStyles();

  // State to control editing of groupname.
  const [editing, setEdit] = React.useState(false);

  const handlePlayerRename = (values: { newName: string }): void => {
    setEdit(!editing);
    onRename(player.uuid, values.newName);
  };

  const onCancel = () => {
    setEdit(!editing);
  };

  const editMode = (
    <FormikListItem
      initialValue={player.name}
      label="Player Name"
      onSubmit={handlePlayerRename}
      onCancel={onCancel}
      onClickAway={() => setEdit(false)}
    />
  );

  const normalMode = (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <SportsHandballRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={player.name} />
      <ListItemSecondaryAction>
        <Tooltip title="Rename Player" arrow>
          <IconButton
            onClick={() => setEdit(!editing)}
            edge="end"
            aria-label="change player's name"
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
  const content: React.ReactNode = editing ? editMode : normalMode;

  return <React.Fragment>{content}</React.Fragment>;
};