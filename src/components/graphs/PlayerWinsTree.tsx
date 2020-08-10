import React, { useRef, useLayoutEffect } from "react";
import Box from "@material-ui/core/Box";
/* Imports for amCharts*/
// Have to add nextjs transpiler
// https://github.com/amcharts/amcharts4/issues/1043
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// Types
import { PlayerWinsTreeDP } from "../../util/types";

interface PlayerWinsTreeProps {
  data: PlayerWinsTreeDP[];
}

const PlayerWinsTree: React.FC<PlayerWinsTreeProps> = ({ data }) => {
  const chartFinal = useRef(null);

  useLayoutEffect(() => {
    // ... Chart code
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end
    // Create chart instance
    let chart = am4core.create("chartdivPlayerWinsTree", am4charts.TreeMap);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // Touch interface
    chart.tapToActivate = true;
    // Make chart adjust to screen size more.
    chart.responsive.enabled = true;

    /* Set color step */
    chart.colors.step = 2;

    // define data fields
    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";

    // chart.zoomable = false;
    let bgColor = new am4core.InterfaceColorSet().getFor("background");

    // level 0 series template
    let level0SeriesTemplate = chart.seriesTemplates.create("0");
    let level0ColumnTemplate = level0SeriesTemplate.columns.template;

    level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level0ColumnTemplate.fillOpacity = 0;
    level0ColumnTemplate.strokeWidth = 4;
    level0ColumnTemplate.strokeOpacity = 0;

    // level 1 series template
    let level1SeriesTemplate = chart.seriesTemplates.create("1");
    let level1ColumnTemplate = level1SeriesTemplate.columns.template;

    level1SeriesTemplate.tooltip.animationDuration = 0;
    level1SeriesTemplate.strokeOpacity = 1;

    level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level1ColumnTemplate.fillOpacity = 1;
    level1ColumnTemplate.strokeWidth = 4;
    level1ColumnTemplate.stroke = bgColor;

    let bullet1 = level1SeriesTemplate.bullets.push(
      new am4charts.LabelBullet()
    );
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fill = am4core.color("#ffffff");

    /* Add a navigation bar */
    chart.navigationBar = new am4charts.NavigationBar();

    /* Add a lagend */
    chart.legend = new am4charts.Legend();

    // ... boiler plate continues
    chartFinal.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  // When the data prop changes it will update the chart
  useLayoutEffect(() => {
    chartFinal.current.data = data;
  }, [data]);

  return <Box width={1} height={500} id="chartdivPlayerWinsTree"></Box>;
};

export default PlayerWinsTree;
