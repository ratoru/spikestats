import React from "react";
import { StatWithGraph } from "./Charts/StatWithGraph";
import { SimpleStat } from "./Charts/SimpleStat";
import { AllStats, getChange } from "../util/calculations";
import { teamToNames, totalWinsToPercentage } from "../util/conversions";
import { Player } from "../util/types";

interface Props {
  stats: AllStats;
  players: Player[];
}

export const Statistics: React.FC<Props> = ({ stats, players }) => {
  return (
    <div className="grid grid-cols-3 gap-8 text-center mt-8 md:mt-0">
      <div className="col-span-3 flex w-full md:w-1/3 mx-auto justify-around">
        <SimpleStat description="Games" value={stats.totalGames.toString()} />
        <SimpleStat description="Points" value={stats.totalPoints.toString()} />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Best Player"
          value={stats.bestPlayer.name}
          dataPoints={totalWinsToPercentage(
            stats.stats[stats.bestPlayer.uuid].wins
          )}
          color="101, 116, 205"
          positive={getChange(stats.stats[stats.bestPlayer.uuid].wins) >= 0}
          change={`${getChange(
            stats.stats[stats.bestPlayer.uuid].wins
          ).toPrecision(2)} %`}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Best Team"
          value={teamToNames(stats.bestTeam, players)}
          dataPoints={totalWinsToPercentage(
            stats.stats[stats.bestTeam.join("")].wins
          )}
          color="246, 109, 155"
          positive={getChange(stats.stats[stats.bestTeam.join("")].wins) >= 0}
          change={`${getChange(
            stats.stats[stats.bestTeam.join("")].wins
          ).toPrecision(2)} %`}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Team with Serve"
          value={`${(
            (stats.servingTeamWins[stats.servingTeamWins.length - 1] /
              stats.totalGames) *
            100
          ).toPrecision(4)} %`}
          dataPoints={totalWinsToPercentage(stats.servingTeamWins)}
          color="246, 153, 63"
          positive={getChange(stats.servingTeamWins) >= 0}
          change={`${getChange(stats.servingTeamWins).toPrecision(2)} %`}
        />
      </div>
    </div>
  );
};
