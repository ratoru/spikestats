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
import { WinPercentageDP } from "../../util/types";

interface WinPercentageProps {
  data: Map<string, WinPercentageDP[]>;
}

const WinPercentage: React.FC<WinPercentageProps> = ({ data }) => {
  const chartFinal = useRef(null);

  useLayoutEffect(() => {
    // ... Chart code
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end
    // Create chart instance
    let chart = am4core.create("chartdivWinPercentage", am4charts.XYChart);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // Make fixed ranged (otherwise it's 0 - 120);
    valueAxis.max = 100;
    valueAxis.min = 0;

    data.forEach((personalData, name) => createSeries(personalData, name));

    // Create series
    function createSeries(personalData: WinPercentageDP[], name: string) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "winPercentage"; // They had + name!!!!!!!!
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.minBulletDistance = 10;
      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.cornerRadius = 20;
      series.tooltip.background.fillOpacity = 0.5;
      series.tooltip.label.padding(12, 12, 12, 12);
      series.name = name;
      series.minBulletDistance = 15; // For bullets
      // Make legend update with the cursor.
      series.legendSettings.valueText = "{valueY.close}";
      series.legendSettings.itemValueText = "[bold]{valueY}[/bold]";
      // Make bullets grow on hover
      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color("#fff");

      let bullethover = bullet.states.create("hover");
      bullethover.properties.scale = 1.3;

      // Legend interaction
      let segment = series.segments.template;
      segment.interactionsEnabled = true;

      let hoverState = segment.states.create("hover");
      hoverState.properties.strokeWidth = 3;

      let dimmed = segment.states.create("dimmed");
      dimmed.properties.stroke = am4core.color("#dadada");

      segment.events.on("over", function (event) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on("out", function (event) {
        processOut(event.target.parent.parent.parent);
      });

      series.data = personalData;
      return series;
    }

    // Create legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function (event) {
      processOver(event.target.dataItem.dataContext);
    });

    chart.legend.itemContainers.template.events.on("out", function (event) {
      processOut(event.target.dataItem.dataContext);
    });

    function processOver(hoveredSeries) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function (segment) {
        segment.setState("hover");
      });

      chart.series.each(function (series) {
        if (series != hoveredSeries) {
          // Add any to avoid compiler warning.
          (series as any).segments.each(function (segment) {
            segment.setState("dimmed");
          });
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut(hoveredSeries) {
      chart.series.each(function (series) {
        // Add any to avoid compiler warning. Code should work. From amcharts example.
        (series as any).segments.each(function (segment) {
          segment.setState("default");
        });
        series.bulletsContainer.setState("default");
      });
    }

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    // Use first series as display.
    (chart.scrollbarX as am4charts.XYChartScrollbar).series.push(
      chart.series.getIndex(0)
    );
    chart.scrollbarX.parent = chart.bottomAxesContainer; // Position underneath.

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    // chart.cursor.snapToSeries = series;

    // ... boiler plate continues
    chartFinal.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  // When the data prop changes it will update the chart
  useLayoutEffect(() => {
    // chartFinal.current.data = data;
    // data.forEach((personalData, name) => createSeries(personalData, name));
  }, [data]);

  return <Box width={1} height={500} id="chartdivWinPercentage"></Box>;
};

export default WinPercentage;
