import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const richAndColorfulTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#90CCF4",
    },
    secondary: {
      main: "#F3D250",
    },
    error: {
      main: "#F78888",
    },
    info: {
      main: "#5DA2D5",
    },
    success: {
      main: "#9AF490",
    },
    // background: {
    //   paper: "#ECECEC",
    // },
  },
  // Sweetalert2 has zindex of 1060.
  zIndex: {
    mobileStepper: 900,
    speedDial: 950,
    appBar: 1000,
  },
});
