import React, { useState } from "react";
import { PlayerChip } from "./PlayerChip";
import { Player, Team } from "../../util/types";
import { idToPlayerName } from "../../util/conversions";

interface AddServeProps {
  players: Player[];
  teams: { blue_team: Team; red_team: Team };
  score: [number, number];
  onChange: (newSelection: string) => void;
}

export const AddServe: React.FC<AddServeProps> = ({
  players,
  teams,
  score,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };
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
      <div className="col-span-1 col-start-1">
        Blue Serve{" "}
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          checked={selectedValue === "blue"}
          onChange={handleChange}
          value="blue"
          name="blueServe"
        />
      </div>
      <div className="col-span-1 col-end-4">
        Red Serve{" "}
        <input
          type="checkbox"
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          checked={selectedValue === "red"}
          onChange={handleChange}
          value="red"
          name="redServe"
        />
      </div>
    </div>
  );
};
