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
import { PlayerPointsDataInstance } from "../../util/types";

interface PlayerPointsProps {
  data: PlayerPointsDataInstance[];
}

const PlayerPoints: React.FC<PlayerPointsProps> = ({ data }) => {
  const chartFinal = useRef(null);

  useLayoutEffect(() => {
    // ... Chart code
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdivPlayers", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    chart.data = data;

    chart.responsive.enabled = true;
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    // valueAxis.title.text = "Points";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "points";
    series.dataFields.categoryX = "name";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

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

  return <Box width={1} height={500} id="chartdivPlayers"></Box>;
};

export default PlayerPoints;
