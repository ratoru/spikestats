import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 as uuidv4 } from "uuid";
import { AddConfirm } from "../Game/AddConfirm";
import { PlayerButton } from "./PlayerButton";
import { Player, Game, ServeTeam } from "../../util/types";
import { back } from "../../util/icons";

interface Props {
  activePlayers: Player[];
  firstServe: number;
  onAdd: (gameToAdd: Game) => void;
  onCancel: () => void;
}

interface GameState {
  blueScore: number;
  redScore: number;
  // curServe can take values 0, 1, 2, 3.
  // Each player is assigned a number, starting at the bottom with 0 going clockwise.
  curServe: number;
  //            bot, left, top, right
  // Positions = [id, id, id, id]
  positions: number[];
}

export const GameSimulator: React.FC<Props> = ({
  activePlayers,
  firstServe,
  onAdd,
  onCancel,
}) => {
  const [numEvents, setNumEvents] = useState<number>(0);
  const [gameStates, setGameStates] = useState<GameState[]>([
    {
      blueScore: 0,
      redScore: 0,
      curServe: firstServe,
      positions: [0, 1, 2, 3],
    },
  ]);

  const handleClick = (playerScored: number) => {
    const curGame = gameStates[numEvents];

    if (curGame.curServe < 2) {
      // Blue Team had the serve.
      if (playerScored <= 1) {
        // Blue Team scored --> swap positions.
        let newPositions: number[] = [...curGame.positions];
        let temp = newPositions[0];
        newPositions[0] = newPositions[1];
        newPositions[1] = temp;
        setGameStates([
          ...gameStates,
          {
            blueScore: curGame.blueScore + 1,
            redScore: curGame.redScore,
            curServe: curGame.curServe,
            positions: newPositions,
          },
        ]);
        setNumEvents(numEvents + 1);
      } else {
        // Red team scored and has the next serve.
        setGameStates([
          ...gameStates,
          {
            blueScore: curGame.blueScore,
            redScore: curGame.redScore + 1,
            curServe: curGame.curServe === 0 ? 2 : 3,
            positions: curGame.positions,
          },
        ]);
        setNumEvents(numEvents + 1);
      }
    } else {
      // Red Team had the serve.
      if (playerScored >= 2) {
        // Red Team scored --> Swap positions.
        let newPositions: number[] = [...curGame.positions];
        let temp = newPositions[2];
        newPositions[2] = newPositions[3];
        newPositions[3] = temp;
        setGameStates([
          ...gameStates,
          {
            blueScore: curGame.blueScore,
            redScore: curGame.redScore + 1,
            curServe: curGame.curServe,
            positions: newPositions,
          },
        ]);
        setNumEvents(numEvents + 1);
      } else {
        // Blue team scored and has the next serve.
        setGameStates([
          ...gameStates,
          {
            blueScore: curGame.blueScore + 1,
            redScore: curGame.redScore,
            curServe: curGame.curServe === 2 ? 1 : 0,
            positions: curGame.positions,
          },
        ]);
        setNumEvents(numEvents + 1);
      }
    }
  };

  const handleUndo = () => {
    setGameStates(gameStates.slice(0, numEvents));
    setNumEvents(numEvents - 1);
  };

  const handleAdd = async () => {
    const newGame: Game = {
      id: uuidv4(),
      blue_team: [activePlayers[0].uuid, activePlayers[1].uuid],
      red_team: [activePlayers[2].uuid, activePlayers[3].uuid],
      score: [gameStates[numEvents].blueScore, gameStates[numEvents].redScore],
      serve: firstServe <= 1 ? ServeTeam.Blue : ServeTeam.Red,
      date_played: new Date(),
    };

    const scoreSwal = withReactContent(Swal);
    const { isDismissed } = await scoreSwal.fire({
      icon: "success",
      title: "Confirm Game",
      html: (
        <AddConfirm
          players={activePlayers}
          teams={{ blue_team: newGame.blue_team, red_team: newGame.red_team }}
          score={newGame.score}
          serve={newGame.serve}
        />
      ),
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Finish",
    });
    if (!isDismissed) {
      // Tell parent to add game to server and update statistics.
      onAdd(newGame);
      // Success
      onCancel();
    }
  };

  const curGame = gameStates[numEvents];

  return (
    <div className="w-full h-full flex flex-col justify-between pt-4 pb-4 md:pt-0">
      <div className="flex justify-between w-64 md:w-80 mx-auto">
        <div className="py-3 px-4 rounded-full bg-blue-200 text-gray-700 text-2xl transform -translate-x-1/2">
          {gameStates[numEvents].blueScore}
        </div>
        <div className="py-3 px-4 rounded-full bg-red-200 text-gray-700 text-2xl transform translate-x-1/2">
          {gameStates[numEvents].redScore}
        </div>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-4 border-4 rounded-full border-gray-600">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <PlayerButton
            name={activePlayers[curGame.positions[2]].name}
            hasServe={curGame.curServe === curGame.positions[2]}
            isBlue={false}
            onClick={() => handleClick(curGame.positions[2])}
          />
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 flex items-center justify-end">
          <PlayerButton
            name={activePlayers[curGame.positions[1]].name}
            hasServe={curGame.curServe === curGame.positions[1]}
            isBlue={true}
            onClick={() => handleClick(curGame.positions[1])}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <button
            className="flex items-center px-4 md:px-6 py-2 text-gray-700 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-700 hover:text-white border-2 border-gray-700 focus:outline-none"
            onClick={() => handleClick((curGame.curServe + 2) % 4)}
          >
            Fault
          </button>
          <button
            className="hidden md:flex items-center justify-center mx-auto py-2 px-4 mt-8 text-gray-700 transform hover:scale-110"
            onClick={handleUndo}
            disabled={numEvents < 1}
          >
            {back}
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 flex items-center justify-start">
          <PlayerButton
            name={activePlayers[curGame.positions[3]].name}
            hasServe={curGame.curServe === curGame.positions[3]}
            isBlue={false}
            onClick={() => handleClick(curGame.positions[3])}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-start justify-center">
          <PlayerButton
            name={activePlayers[curGame.positions[0]].name}
            hasServe={curGame.curServe === curGame.positions[0]}
            isBlue={true}
            onClick={() => handleClick(curGame.positions[0])}
          />
        </div>
      </div>
      <button
        className="flex md:hidden items-center justify-center mx-auto py-2 px-4 transform hover:scale-110"
        onClick={handleUndo}
        disabled={numEvents < 1}
      >
        {back}
      </button>
      <div className="mx-auto w-max">
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleAdd}
          disabled={curGame.blueScore === curGame.redScore}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
