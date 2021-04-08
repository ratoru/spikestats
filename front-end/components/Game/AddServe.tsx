import React, { useState } from "react";
import { PlayerChip } from "./PlayerChip";
import { Player, Team, ServeTeam } from "../../util/types";
import { serve as serveIcon } from "../../util/icons";
import { idToPlayerName } from "../../util/conversions";

interface AddServeProps {
  players: Player[];
  teams: { blue_team: Team; red_team: Team };
  score: [number, number];
  onChange: (newSelection: ServeTeam) => void;
}

export const AddServe: React.FC<AddServeProps> = ({
  players,
  teams,
  score,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<ServeTeam>(ServeTeam.Blue);

  const handleChange = () => {
    let newValue =
      selectedValue === ServeTeam.Blue ? ServeTeam.Red : ServeTeam.Blue;
    setSelectedValue(newValue);
    onChange(newValue);
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
      <div className="col-span-1 text-3xl font-bold tracking-wider text-center my-auto">
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
      <div className="col-span-3 flex justify-around items-center">
        <button
          className={`${
            selectedValue === ServeTeam.Blue ? `text-blue-500` : `text-gray-500`
          } focus:outline-none`}
          onClick={handleChange}
        >
          {serveIcon}
        </button>
        <div className="relative inline-block w-16 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id="serve"
            onChange={handleChange}
            checked={selectedValue === ServeTeam.Red}
            className="checked:bg-red-500 outline-none focus:outline-none right-8 checked:right-0 duration-200 ease-in absolute block w-8 h-8 rounded-full bg-blue-500 border-4 border-gray-300 appearance-none cursor-pointer"
          />
          <label
            htmlFor="serve"
            className="block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
        <button
          className={`${
            selectedValue === ServeTeam.Red ? `text-red-500` : `text-gray-500`
          } focus:outline-none`}
          onClick={handleChange}
        >
          {serveIcon}
        </button>
      </div>
    </div>
  );
};
