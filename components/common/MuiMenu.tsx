import React, { ReactElement } from "react";
import Link from "next/link";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Tooltip,
} from "@material-ui/core";
import { Turn as Hamburger } from "hamburger-react";

export type MuiMenuItem = [string, ReactElement, string];

interface MuiMenuProps {
  items: MuiMenuItem[];
  color: string;
  size?: number;
}

export const MuiMenu: React.FC<MuiMenuProps> = ({
  items,
  size = 32,
  color,
}) => {
  // Hamburger state
  const [isOpen, setOpen] = React.useState(false);
  // Boiler-plate code from MUI for the menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // Adjustment to also close Hamburger.
    setOpen(!isOpen);
  };

  // Allows you to refer to your defined theme.
  const theme = useTheme();
  const themeColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.success.main,
  ];
  let numColors = themeColors.length;

  return (
    <React.Fragment>
      <Tooltip title="Menu" arrow>
        <div onClick={handleClick}>
          <Hamburger
            size={size}
            color={color}
            label="Show menu"
            rounded
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
      </Tooltip>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((curItem, index) => {
          return (
            <Link href={curItem[2]} passHref key={index}>
              <MenuItem
                component="a"
                style={{ backgroundColor: themeColors[index % numColors] }}
              >
                <ListItemIcon>{curItem[1]}</ListItemIcon>
                <ListItemText primary={curItem[0]} />
              </MenuItem>
            </Link>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};
