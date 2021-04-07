import React, { useState } from "react";
import { PlayerChip } from "./PlayerChip";
import { Player, Team } from "../../util/types";
import { idToPlayerName } from "../../util/conversions";

interface AddScoreField {
  players: Player[];
  teams: { blue_team: Team; red_team: Team };
  blueScore: number;
  redScore: number;
  onChange: (points: number, isBlue: boolean) => void;
}

export const AddScoreField: React.FC<AddScoreField> = ({
  players,
  teams,
  blueScore,
  redScore,
  onChange,
}) => {
  const [curBlue, setBlue] = useState(blueScore);
  const [curRed, setRed] = useState(redScore);

  return (
    <div className="w-full h-full grid grid-cols-2 gap-4">
      <div className="cols-span-1 flex flex-col justify-around items-center">
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
      <div className="cols-span-1 flex flex-col justify-around items-center">
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
      <div className="cols-span-1">
        <input
          type="number"
          className="rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          autoComplete="off"
          autoFocus
          placeholder="Blue Score"
          value={curBlue}
          onChange={(event) => {
            if (event.target.type === "number") {
              const enteredScore = parseInt(event.target.value);
              onChange(enteredScore, true);
              setBlue(enteredScore);
            } else {
              onChange(0, true);
              setBlue(0);
            }
          }}
        ></input>
      </div>
      <div className="cols-span-1">
        <input
          type="number"
          className="rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          autoComplete="off"
          placeholder="Red Score"
          value={curRed}
          onChange={(event) => {
            if (event.target.type === "number") {
              const enteredScore = parseInt(event.target.value);
              onChange(enteredScore, false);
              setRed(enteredScore);
            } else {
              onChange(0, false);
              setRed(0);
            }
          }}
        ></input>
      </div>
    </div>
  );
};
