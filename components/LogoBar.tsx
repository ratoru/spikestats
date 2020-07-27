import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import { Typography } from "@material-ui/core";
import Link from "next/link";

export const LogoBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <img
          src="/roundnet-logo.svg"
          height={60}
          width={60}
          style={{ marginRight: 30 }}
        />
        <Typography variant="subtitle1" style={{ flex: 1 }}>
          Roundnet-Stats{" "}
        </Typography>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link href="/" passHref>
            <MenuItem component="a" style={{ backgroundColor: "primary" }}>
              <ListItemIcon>
                <LockOpenRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </Link>
          <Link href="/about" passHref>
            <MenuItem component="a" style={{ backgroundColor: "error" }}>
              <ListItemIcon>
                <InfoRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </MenuItem>
          </Link>
          <Link href="/code" passHref>
            <MenuItem component="a" style={{ backgroundColor: "secondary" }}>
              <ListItemIcon>
                <CodeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Code" />
            </MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
