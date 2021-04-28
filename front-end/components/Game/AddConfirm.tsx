import React from "react";
import { PlayerChip } from "./PlayerChip";
import { Player, Team, ServeTeam } from "../../util/types";
import { idToPlayerName } from "../../util/conversions";
import { serve as serveIcon } from "../../util/icons";

interface AddConfirmProps {
  players: Player[];
  teams: { blue_team: Team; red_team: Team };
  score: [number, number];
  serve: ServeTeam;
}

export const AddConfirm: React.FC<AddConfirmProps> = ({
  players,
  teams,
  score,
  serve,
}) => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col justify-around items-center">
        {teams.blue_team.map((id) => {
          return (
            <PlayerChip
              key={id}
              name={idToPlayerName(id, players)}
              color="blue"
            />
          );
        })}
      </div>
      <div className="col-span-1 flex-col items-center justify-around text-center my-auto">
        <div className="text-3xl font-bold tracking-wider">
          {score[0]}:{score[1]}
        </div>
        <div
          className={`flex justify-center items-center mt-6 ${
            serve ? "text-red-500" : "text-blue-500"
          }`}
        >
          {serveIcon}
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-around items-center">
        {teams.red_team.map((id) => {
          return (
            <PlayerChip
              key={id}
              name={idToPlayerName(id, players)}
              color="red"
            />
          );
        })}
      </div>
    </div>
  );
};
