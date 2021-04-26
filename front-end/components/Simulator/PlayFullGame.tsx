import React, { useState } from "react";
import { Player } from "../../util/types";
import { GameSimulator } from "./GameSimulator";
import { AddChips } from "../Game/AddChips";

interface Props {
  players: Player[];
}

enum Stage {
  PlayerSelection,
  PlayingGame,
}

export const PlayFullGame: React.FC<Props> = ({ players }) => {
  const [curStage, setCurStage] = useState<Stage>(Stage.PlayerSelection);

  const handleCancel = () => {
    setCurStage(Stage.PlayerSelection);
  };

  return (
    <div className="w-full h-full">
      {curStage === Stage.PlayerSelection && (
        <button onClick={() => setCurStage(Stage.PlayingGame)}>Play</button>
      )}
      {curStage === Stage.PlayingGame && (
        <GameSimulator activePlayers={players} onCancel={handleCancel} />
      )}
    </div>
  );
};
