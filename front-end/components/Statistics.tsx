import React from "react";
import { StatWithGraph } from "./Charts/StatWithGraph";
import { SimpleStat } from "./Charts/SimpleStat";
import { Points } from "./Charts/Points";
import { PlayerWPerc } from "./Charts/PlayerWPerc";
import { AllStats, getChange } from "../util/calculations";
import { teamToNames, totalWinsToPercentage } from "../util/conversions";
import { Player } from "../util/types";

interface Props {
  allStats: AllStats;
  players: Player[];
}

export const Statistics: React.FC<Props> = ({ allStats, players }) => {
  return (
    <div className="grid grid-cols-3 gap-8 text-center mt-8 md:mt-0">
      <div className="col-span-3 flex w-full md:w-1/3 mx-auto justify-around">
        <SimpleStat
          description="Games"
          value={allStats.totalGames.toString()}
        />
        <SimpleStat
          description="Points"
          value={allStats.totalPoints.toString()}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Best Player"
          value={allStats.bestPlayer.name}
          dataPoints={totalWinsToPercentage(
            allStats.stats[allStats.bestPlayer.uuid].wins
          )}
          color="101, 116, 205"
          positive={
            getChange(allStats.stats[allStats.bestPlayer.uuid].wins) >= 0
          }
          change={`${getChange(
            allStats.stats[allStats.bestPlayer.uuid].wins
          ).toPrecision(2)} %`}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Best Team"
          value={teamToNames(allStats.bestTeam, players)}
          dataPoints={totalWinsToPercentage(
            allStats.stats[allStats.bestTeam.join("")].wins
          )}
          color="246, 109, 155"
          positive={
            getChange(allStats.stats[allStats.bestTeam.join("")].wins) >= 0
          }
          change={`${getChange(
            allStats.stats[allStats.bestTeam.join("")].wins
          ).toPrecision(2)} %`}
        />
      </div>
      <div className="col-span-3 md:col-span-1">
        <StatWithGraph
          description="Team with Serve"
          value={`${(
            (allStats.servingTeamWins[allStats.servingTeamWins.length - 1] /
              allStats.totalGames) *
            100
          ).toPrecision(4)} %`}
          dataPoints={totalWinsToPercentage(allStats.servingTeamWins)}
          color="246, 153, 63"
          positive={getChange(allStats.servingTeamWins) >= 0}
          change={`${getChange(allStats.servingTeamWins).toPrecision(2)} %`}
        />
      </div>
      <div className="col-span-3">
        <PlayerWPerc
          dataValues={players.map((player) => {
            return {
              data: totalWinsToPercentage(allStats.stats[player.uuid].wins),
              name: player.name,
              gamesPlayed: allStats.stats[player.uuid].gamesPlayed,
            };
          })}
        />
      </div>
      <div className="col-span-3">
        <Points
          dataset={players.map((player) => {
            return allStats.stats[player.uuid].pointsContributed;
          })}
          labels={players.map((player) => player.name)}
        />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};
