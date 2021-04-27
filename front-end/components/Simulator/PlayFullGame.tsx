import React, { useState } from "react";
import { Player, Game } from "../../util/types";
import { GameSimulator } from "./GameSimulator";
import { AddChips } from "../Game/AddChips";

interface Props {
  players: Player[];
  onAdd: (gameToAdd: Game) => void;
}

enum Stage {
  PlayerSelection,
  PlayingGame,
}

export const PlayFullGame: React.FC<Props> = ({ players, onAdd }) => {
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
        <GameSimulator
          activePlayers={players}
          firstServe={0}
          onCancel={handleCancel}
          onAdd={onAdd}
        />
      )}
    </div>
  );
};
