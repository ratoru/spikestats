import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, useTheme } from "@material-ui/core";
import { LoggedInMenu } from "../../menus/LoggedInMenu";
import { LoggedOutMenu } from "../../menus/LoggedOutMenu";
import { useIsAuthenticated } from "../../../providers/Auth";

export const LogoBar = () => {
  const theme = useTheme();

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
        {useIsAuthenticated() ? <LoggedInMenu /> : <LoggedOutMenu />}
      </Toolbar>
    </AppBar>
  );
};
