import React from "react";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import { useTheme } from "@material-ui/core";
import { LoggedInMenu } from "../menus/LoggedInMenu";
import { LoggedOutMenu } from "../menus/LoggedOutMenu";
import { useIsAuthenticated } from "../../providers/Auth";

export const MainBar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Tooltip arrow title="My Groups">
              <Button
                style={{ backgroundColor: "white" }}
                onClick={() => router.push("/groups")}
              >
                <Box mr={2}>
                  <img height="50vw" src="/roundnet-logo.svg" />
                </Box>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Roundnet-stats
                </Typography>
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            {useIsAuthenticated() ? <LoggedInMenu /> : <LoggedOutMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
