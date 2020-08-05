// This is heavily based on the example provided on the amcharts website.
import React, { useRef, useLayoutEffect } from "react";
import Box from "@material-ui/core/Box";
/* Imports for amCharts*/
// Have to add nextjs transpiler
// https://github.com/amcharts/amcharts4/issues/1043
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
// Icons
import HotelRoundedIcon from "@material-ui/icons/HotelRounded";

const AboutTimeLine: React.FC = () => {
  const chartFinal = useRef(null);

  useLayoutEffect(() => {
    // ... Chart code
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4plugins_timeline.SerpentineChart);
    chart.curveContainer.padding(100, 20, 50, 20);
    chart.levelCount = 3;
    chart.yAxisRadius = am4core.percent(20);
    chart.yAxisInnerRadius = am4core.percent(2);
    chart.maskBullets = false;

    let colorSet = new am4core.ColorSet();

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
    chart.dateFormatter.dateFormat = "HH";

    chart.data = [
      {
        category: "",
        start: "2019-01-10 06:00",
        end: "2019-01-10 08:00",
        color: colorSet.getIndex(15),
        text: "ZZZzzzzz",
        textDisabled: false,
        icon: "/material_icons/local_hotel-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 08:00",
        end: "2019-01-10 9:00",
        color: colorSet.getIndex(13),
        text: "Hit snooze",
        textDisabled: false,
        icon: "/material_icons/notifications_paused-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 9:00",
        end: "2019-01-10 10:00",
        color: colorSet.getIndex(12),
        icon: "/material_icons/emoji_food_beverage-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 10:00",
        end: "2019-01-10 13:00",
        color: colorSet.getIndex(10),
        icon: "/material_icons/work-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 13:00",
        end: "2019-01-10 14:00",
        color: colorSet.getIndex(9),
        text: "Convince friends to play",
        textDisabled: false,
        icon: "/material_icons/connect_without_contact-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 14:00",
        end: "2019-01-10 16:00",
        color: colorSet.getIndex(8),
        icon: "/material_icons/work-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 16:00",
        end: "2019-01-10 17:00",
        color: colorSet.getIndex(7),
        icon: "/material_icons/login-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 17:00",
        end: "2019-01-10 20:00",
        color: colorSet.getIndex(6),
        icon: "/material_icons/sports_baseball-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 20:00",
        end: "2019-01-10 21:00",
        color: colorSet.getIndex(5),
        text: "Analyze Statistics",
        textDisabled: false,
        icon: "material_icons/bar_chart-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 21:00",
        end: "2019-01-10 21:30",
        color: colorSet.getIndex(4),
        icon: "material_icons/emoji_events-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 21:30",
        end: "2019-01-10 22:00",
        color: colorSet.getIndex(3),
        icon: "material_icons/restaurant-24px.svg",
      },
      {
        category: "",
        start: "2019-01-10 22:00",
        end: "2019-01-10 24:00",
        color: colorSet.getIndex(2),
        icon: "material_icons/work-24px.svg",
      },
      {
        category: "",
        start: "2019-01-11 00:00",
        end: "2019-01-11 01:00",
        color: colorSet.getIndex(0),
        text: "Repeat!",
        textDisabled: false,
        icon: "material_icons/all_inclusive-24px.svg",
      },
    ];

    chart.fontSize = 10;
    chart.tooltipContainer.fontSize = 10;

    // amCharts does not support strict mode yet. That's why as any is needed.
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.paddingRight = 25;
    categoryAxis.renderer.minGridDistance = 10;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.minGridDistance = 70;
    dateAxis.baseInterval = { count: 30, timeUnit: "minute" };
    dateAxis.renderer.tooltipLocation = 0;
    dateAxis.renderer.line.strokeDasharray = "1,4";
    dateAxis.renderer.line.strokeOpacity = 0.5;
    dateAxis.tooltip.background.fillOpacity = 0.2;
    dateAxis.tooltip.background.cornerRadius = 5;
    dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    dateAxis.tooltip.label.paddingTop = 7;
    dateAxis.endLocation = 0;
    dateAxis.startLocation = -0.5;

    let labelTemplate = dateAxis.renderer.labels.template;
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fillOpacity = 0.4;
    labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor(
      "background"
    );
    labelTemplate.background.fillOpacity = 1;
    labelTemplate.padding(7, 7, 7, 7);

    let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
    series.columns.template.height = am4core.percent(15);

    series.dataFields.openDateX = "start";
    series.dataFields.dateX = "end";
    series.dataFields.categoryY = "category";
    series.baseAxis = categoryAxis;
    series.columns.template.propertyFields.fill = "color"; // get color from data
    series.columns.template.propertyFields.stroke = "color";
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.6;

    let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
    imageBullet1.locationX = 1;
    imageBullet1.propertyFields.stroke = "color";
    imageBullet1.background.propertyFields.fill = "color";
    imageBullet1.image = new am4core.Image();
    imageBullet1.image.propertyFields.href = "icon";
    imageBullet1.image.scale = 0.5;
    imageBullet1.circle.radius = am4core.percent(100);
    imageBullet1.dy = -5;

    let textBullet = series.bullets.push(new am4charts.LabelBullet());
    textBullet.label.propertyFields.text = "text";
    textBullet.disabled = true;
    textBullet.propertyFields.disabled = "textDisabled";
    textBullet.label.strokeOpacity = 0;
    textBullet.locationX = 1;
    textBullet.dy = -100;
    textBullet.label.textAlign = "middle";

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.align = "center";
    chart.scrollbarX.width = am4core.percent(75);
    chart.scrollbarX.opacity = 0.5;

    let cursor = new am4plugins_timeline.CurveCursor();
    chart.cursor = cursor;
    cursor.xAxis = dateAxis;
    cursor.yAxis = categoryAxis;
    cursor.lineY.disabled = true;
    cursor.lineX.strokeDasharray = "1,4";
    cursor.lineX.strokeOpacity = 1;

    dateAxis.renderer.tooltipLocation2 = 0;
    categoryAxis.cursorTooltipEnabled = false;

    let label = chart.createChild(am4core.Label);
    label.text = "A day of using roundnet-stats.";
    label.isMeasured = false;
    label.y = am4core.percent(40);
    label.x = am4core.percent(50);
    label.horizontalCenter = "middle";
    label.fontSize = 20;
    chartFinal.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  return <Box width={1} height={650} id="chartdiv"></Box>;
};

export default AboutTimeLine;
