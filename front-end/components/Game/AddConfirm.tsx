import React from "react";
import { PlayerChip } from "./PlayerChip";
import { Player, Team, ServeTeam } from "../../util/types";
import { idToPlayerName } from "../../util/conversions";

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
      <div className="col-span-1 text-xl font-bold text-center my-auto">
        {score[0]}:{score[1]}
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
      <div className="col-span-3">{serve ? "Red" : "Blue"} Serve</div>
    </div>
  );
};
