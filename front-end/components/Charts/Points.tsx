import React from "react";
import { Bar } from "react-chartjs-2";
import { colorsInOrder } from "../../util/colors";

interface Props {
  dataset: number[];
  labels: string[];
}

const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const Points: React.FC<Props> = ({ dataset, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of points contributed",
        data: dataset,
        backgroundColor: colorsInOrder,
        borderWidth: 0,
        borderRadius: 5,
      },
    ],
  };
  return (
    <div className="w-full bg-white rounded-lg shadow px-4 md:px-8 py-6">
      <div className="text-center">
        <h4 className="text-sm uppercase text-gray-500 leading-tight mb-6 rounded">
          Points Per Player
        </h4>
      </div>
      <div className="h-80">
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
};
