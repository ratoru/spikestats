import React from "react";
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
      <MyHeader />
      <h1>My Coding Adventure</h1>
      <h2>Getting Started</h2>
      <p>
        Here I will write about how I programmed this page if I find the time.
        In the meantime enjoy this little timeline.
      </p>
      <AboutTimeLine />
    </React.Fragment>
  );
}
