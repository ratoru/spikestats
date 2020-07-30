import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import { Typography, useTheme } from "@material-ui/core";
import { MuiMenu, MuiMenuItem } from "./common/MuiMenu";

export const LogoBar = () => {
  // Boiler-plate code from MUI
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();

  const menu: MuiMenuItem[] = [
    ["Sign up", <LockOpenRoundedIcon />, "/"],
    ["About", <InfoRoundedIcon />, "/about"],
    ["Code", <CodeRoundedIcon />, "/code"],
  ];

  return (
    <AppBar position="sticky" color="secondary">
      <Toolbar>
        <img
          src="/roundnet-logo.svg"
          width="100vw"
          style={{
            marginRight: 30,
          }}
        />
        <Typography variant="subtitle1" style={{ flex: 1 }}>
          Roundnet-Stats{" "}
        </Typography>
        <MuiMenu items={menu} color={theme.palette.info.main} />
      </Toolbar>
    </AppBar>
  );
};
