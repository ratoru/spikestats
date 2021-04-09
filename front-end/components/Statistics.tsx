import React from "react";
import { SimpleStat } from "./Charts/SimpleStat";
import { AllStats } from "../util/calculations";

interface Props {
  stats: AllStats;
}

export const Statistics: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-8 text-center">
      <div className="col-span-3 flex w-full justify-around">
        <SimpleStat />
        <div>Games Played {stats.totalGames}</div>
        <div>Points Scored {stats.totalPoints}</div>
      </div>
      <div className="col-span-1">Best Player</div>
      <div className="col-span-1">
        Team with Serve{" "}
        {stats.servingTeamWins[stats.servingTeamWins.length - 1] /
          stats.totalGames}
      </div>
      <div className="col-span-1">Best Team</div>
      <div className="col-span-3">
        <div>Games played, Points scored: No card</div>
        <div>Best Player, Team with Serve, Best Team, Codepen Card</div>
        <div>Individual Win Percentage</div>
        <div>Point contributions</div>
      </div>
    </div>
  );
};
