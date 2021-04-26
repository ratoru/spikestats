import React from "react";
import { Line } from "react-chartjs-2";
import { colorsInOrder } from "../../util/colors";

interface playerSeries {
  data: number[];
  name: string;
  gamesPlayed: number;
}

interface Props {
  dataValues: playerSeries[];
}

function getLabels(dataValues: playerSeries[]): number[] {
  let labels = [];
  const allGamesPlayed = dataValues.map((series) => {
    return series.gamesPlayed;
  });
  const maxGamesPlayed = Math.max(...allGamesPlayed);
  for (let i = 1; i <= maxGamesPlayed; i++) {
    labels.push(i);
  }
  return labels;
}

const chartOptions = {
  maintainAspectRatio: false,
  scaleOverride: true,
  scaleSteps: 9,
  scaleStepWidth: 10,
  scaleStartValue: 0,
};

export const PlayerWPerc: React.FC<Props> = ({ dataValues }) => {
  const data = {
    labels: getLabels(dataValues),
    datasets: dataValues.map((dataset, i) => {
      return {
        label: dataset.name,
        data: dataset.data,
        borderColor: colorsInOrder[i],
        pointBackgroundColor: colorsInOrder[i],
        pointBorderColor: "white",
        fill: false,
      };
    }),
  };

  return (
    <div className="w-full bg-white rounded-lg shadow px-4 md:px-8 py-6">
      <div className="text-center">
        <h4 className="text-sm uppercase text-gray-500 leading-tight mb-6">
          Players' Win Percentage
        </h4>
      </div>
      <div className="h-80">
        <Line data={data} options={chartOptions} />
      </div>
    </div>
  );
};
