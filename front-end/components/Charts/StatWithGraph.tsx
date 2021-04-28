// Inspired by https://codepen.io/ScottWindon/pen/GRZjbaG
import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  description: string;
  value: string;
  dataPoints: number[];
  color?: string;
  change?: string;
  positive?: boolean;
}

const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: false,
        scaleLabel: false,
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: false,
        scaleLabel: false,
        ticks: {
          display: false,
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    ],
  },
};

export const StatWithGraph: React.FC<Props> = ({
  description,
  value,
  dataPoints,
  color,
  change,
  positive,
}) => {
  const data = {
    labels: dataPoints,
    datasets: [
      {
        backgroundColor: `rgba(${color}, 0.1)`,
        borderColor: `rgba(${color}, 0.8)`,
        borderWidth: 2,
        data: dataPoints,
      },
    ],
  };

  return (
    <div className="w-full h-full px-2 rounded-lg shadow bg-white relative overflow-hidden">
      <div className="px-3 pt-10 pb-12 text-center relative z-10">
        <h4 className="text-sm uppercase text-gray-500 leading-tight">
          {description}
        </h4>
        <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-4">
          {value}
        </h3>
        <p
          className={`text-xs text-${
            positive ? `green` : `red`
          }-500 leading-tight`}
        >
          {positive ? "▲ " : "▼ "}
          {change}
        </p>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-1/3 overflow-hidden">
        <Line data={data} options={chartOptions} />
      </div>
    </div>
  );
};
