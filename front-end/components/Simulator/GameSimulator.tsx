import React, { useState } from "react";
import { PlayerButton } from "./PlayerButton";
import { Player } from "../../util/types";

interface Props {
  activePlayers: Player[];
  onCancel: () => void;
}

export const GameSimulator: React.FC<Props> = ({ activePlayers, onCancel }) => {
  const [blueScore, setBlueScore] = useState<number>(0);
  const [redScore, setRedScore] = useState<number>(0);

  // curServe can take values 0, 1, 2, 3.
  // Each player is assigned a number, starting at the bottom with 0 going clockwise.
  const [curServe, setCurServe] = useState<number>(0);

  //            bot, left, top, right
  // Positions = [id, id, id, id]
  const [positions, setPositions] = useState<number[]>([0, 1, 2, 3]);

  const handleClick = (playerScored: number) => {
    if (curServe < 2) {
      // Blue Team had the serve.
      if (playerScored <= 1) {
        // Blue Team scored --> swap positions.
        let newPositions: number[] = [...positions];
        let temp = newPositions[0];
        newPositions[0] = newPositions[1];
        newPositions[1] = temp;
        setPositions(newPositions);
        setBlueScore(blueScore + 1);
      } else {
        // Red team scored and has the next serve.
        setCurServe(curServe === 0 ? 2 : 3);
        setRedScore(redScore + 1);
      }
    } else {
      // Red Team had the serve.
      if (playerScored >= 2) {
        // Red Team scored --> Swap positions.
        let newPositions: number[] = [...positions];
        let temp = newPositions[2];
        newPositions[2] = newPositions[3];
        newPositions[3] = temp;
        setPositions(newPositions);
        setRedScore(redScore + 1);
      } else {
        // Blue team scored and has the next serve.
        setCurServe(curServe === 2 ? 1 : 0);
        setBlueScore(blueScore + 1);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-4">
      <div className="flex justify-around w-4/5 md:w-1/2 mx-auto">
        <div className="py-3 px-4 rounded-full bg-blue-500 text-2xl">
          {blueScore}
        </div>
        <div className="py-3 px-4 rounded-full bg-red-500 text-2xl">
          {redScore}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 my-8">
        <div className="col-span-1 col-start-2 flex items-center justify-center">
          <PlayerButton
            name={activePlayers[positions[2]].name}
            hasServe={curServe === positions[2]}
            isBlue={false}
            onClick={() => handleClick(positions[2])}
          />
        </div>
        <div className="col-span-1 col-start-1 flex items-center justify-end">
          <PlayerButton
            name={activePlayers[positions[1]].name}
            hasServe={curServe === positions[1]}
            isBlue={true}
            onClick={() => handleClick(positions[1])}
          />
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <button
            className="rounded-lg shadow-lg bg-red-100 text-gray-600 p-2"
            onClick={() => handleClick((curServe + 2) % 4)}
          >
            Fault
          </button>
        </div>
        <div className="col-span-1 col-start-3 flex items-center justify-start">
          <PlayerButton
            name={activePlayers[positions[3]].name}
            hasServe={curServe === positions[3]}
            isBlue={false}
            onClick={() => handleClick(positions[3])}
          />
        </div>
        <div className="col-span-1 col-start-2 flex items-start justify-center">
          <PlayerButton
            name={activePlayers[positions[0]].name}
            hasServe={curServe === positions[0]}
            isBlue={true}
            onClick={() => handleClick(positions[0])}
          />
        </div>
        <div className="col-span-1 col-start-2 flex items-center justify-center">
          <button>Undo</button>
        </div>
      </div>
      <div className="mx-auto w-max">
        <button className="px-4 py-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="ml-4 px-4 py-2" disabled={blueScore === redScore}>
          Finish
        </button>
      </div>
    </div>
  );
};
