import React, { ReactElement } from "react";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

interface MyMenuItemProps {
  icon: ReactElement;
  text: string;
  href: string;
  onClick?: () => void;
}

export const MyMenuItem: React.FC<MyMenuItemProps> = ({
  icon,
  text,
  href,
  onClick,
}) => {
  return (
    <Link href={href}>
      <ListItem component="a" button style={{ width: 200 }} onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          disableTypography
          primary={<Typography variant="h6">{text}</Typography>}
        />
      </ListItem>
    </Link>
  );
};
