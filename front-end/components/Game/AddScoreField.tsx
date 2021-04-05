import React, { useState } from "react";
import { Player, Team } from "../../util/types";

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
      <div className="cols-span-1 flex flex-wrap justify-around items-center">
        {teams.blue_team.map((id) => {
          return (
            <div key={id} className="bg-blue-500 px-2 py-4">
              {id}
            </div>
          );
        })}
      </div>
      <div className="cols-span-1 flex flex-wrap justify-around items-center">
        {teams.red_team.map((id) => {
          return (
            <div key={id} className="bg-red-500 px-2 py-4">
              {id}
            </div>
          );
        })}
      </div>
      <div className="cols-span-1">
        <input
          type="number"
          autoComplete="off"
          autoFocus
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
          autoComplete="off"
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
