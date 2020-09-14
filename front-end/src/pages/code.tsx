import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { MyHeader } from "../components/common/MyHeader";
// Need to use browser rendering for all amCharts.
// https://github.com/amcharts/amcharts4/issues/272#issuecomment-646326596
import dynamic from "next/dynamic";

const AboutTimeLine = dynamic(
  () => import("../components/graphs/AboutTimeLine"),
  {
    ssr: false,
  }
);

export default function Code() {
  return (
    <React.Fragment>
      <MyHeader withPadding={false} />
      <Grid container>
        <Grid
          item
          container
          xs={12}
          style={{ height: "100vh" }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h1" align="center" paragraph>
              My Coding Adventure
            </Typography>
            <Typography variant="h2" align="center">
              <a href="#started" style={{ color: "inherit" }}>
                Getting Started
              </a>{" "}
              |{" "}
              <a href="#timeline" style={{ color: "inherit" }}>
                Stats-Timeline
              </a>{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="started">
              <Typography variant="h2" align="center" paragraph>
                Getting Started
              </Typography>
            </a>
            <Typography align="center">
              Here I will write about how I programmed this page using Nextjs
              and Rust if I find the time. <br />
              In the meantime enjoy this little timeline.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          style={{
            height: "100vh",
          }}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <a id="timeline">
              <AboutTimeLine />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
