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

interface PlayerListItemProps {
  player: string;
  onRename: (player: string) => void;
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
  return (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <EmojiPeopleRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={player} />
      <ListItemSecondaryAction>
        <Tooltip title="Rename Player" arrow>
          <IconButton
            onClick={() => onRename(player)}
            edge="end"
            aria-label="change player's name"
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
