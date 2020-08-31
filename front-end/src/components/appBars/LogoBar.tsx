import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import { Typography, useTheme } from "@material-ui/core";
import { MuiMenu, MuiMenuItem } from "./MuiMenu";

export const LogoBar = () => {
  const theme = useTheme();

  const menu: MuiMenuItem[] = [
    ["Sign in", <LockOpenRoundedIcon />, "/"],
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
        <Typography variant="h6" style={{ flex: 1 }}>
          Roundnet-Stats{" "}
        </Typography>
        <MuiMenu items={menu} color={theme.palette.info.main} />
      </Toolbar>
    </AppBar>
  );
};
