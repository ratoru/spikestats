// Some parts seem to be broken rn.
// https://github.com/mbrn/material-table/issues/2244

// Code adapted from the MUI documentation.
import React, { ReactNode } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Fab from "@material-ui/core/Fab";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import TrendingUpRoundedIcon from "@material-ui/icons/TrendingUpRounded";
import SportsBaseballRoundedIcon from "@material-ui/icons/SportsBaseballRounded";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} marginBottom={8}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100vw",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

interface StatsTabProps {
  tab1Content: ReactNode;
  tab2Content: ReactNode;
  onAdd: () => void;
}

export const NavStats: React.FC<StatsTabProps> = ({
  tab1Content,
  tab2Content,
  onAdd,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Statistics and games panel"
        >
          <Tab
            label="Statistics"
            icon={<TrendingUpRoundedIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="Games"
            icon={<SportsBaseballRoundedIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
        <Tooltip placement="top" title="Add Game">
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            onClick={onAdd}
          >
            <AddRoundedIcon />
          </Fab>
        </Tooltip>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        {tab1Content}
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {tab2Content}
      </TabPanel>
    </div>
  );
};
