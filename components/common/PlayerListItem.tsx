import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import EmojiPeopleRoundedIcon from "@material-ui/icons/EmojiPeopleRounded";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FormikListItem } from "./FormikListItem";

interface PlayerListItemProps {
  player: string;
  onRename: (oldPlayer: string, newPlayer: string) => void;
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
    onRename(player, values.newName);
  };

  const onCancel = () => {
    setEdit(!editing);
  };

  const editMode = (
    <FormikListItem
      initialValue={player}
      label="Player Name"
      onSubmit={handlePlayerRename}
      onCancel={onCancel}
      onClickAway={() => setEdit(false)}
    />
  );

  const normalMode = (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <EmojiPeopleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={player} />
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
