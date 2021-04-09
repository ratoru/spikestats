import React from "react";
import { AllStats } from "../util/calculations";
import { teamToNames } from "../util/conversions";
import { Player, Team } from "../util/types";

interface Props {
  stats: AllStats;
  players: Player[];
}

export const Statistics: React.FC<Props> = ({ stats, players }) => {
  return (
    <div className="grid grid-cols-3 gap-8 text-center">
      <div className="col-span-3 flex w-full justify-around">
        <div>Games Played {stats.totalGames}</div>
        <div>Points Scored {stats.totalPoints}</div>
      </div>
      <div className="col-span-1">Best Player {stats.bestPlayer.name}</div>
      <div className="col-span-1">
        Team with Serve{" "}
        {stats.servingTeamWins[stats.servingTeamWins.length - 1] /
          stats.totalGames}
      </div>
      <div className="col-span-1">
        Best Team {teamToNames(stats.bestTeam, players)}
      </div>
      <div className="col-span-3">
        <div>Games played, Points scored: No card</div>
        <div>Best Player, Team with Serve, Best Team, Codepen Card</div>
        <div>Individual Win Percentage</div>
        <div>Point contributions</div>
      </div>
    </div>
  );
};
