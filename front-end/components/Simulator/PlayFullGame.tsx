import React, { useState } from "react";
import { Player, Game } from "../../util/types";
import { GameSimulator } from "./GameSimulator";
import { PlayerSelection } from "./PlayerSelection";

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
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [firstServe, setFirstServe] = useState<number>(0);

  const handleCancel = () => {
    setCurStage(Stage.PlayerSelection);
  };

  const handleContinue = (activePlayers: Player[], firstServe: number) => {
    console.log(firstServe);
    setActivePlayers(activePlayers);
    setFirstServe(firstServe);
    setCurStage(Stage.PlayingGame);
  };

  return (
    <div className="w-full h-full">
      {curStage === Stage.PlayerSelection && (
        <PlayerSelection players={players} onContinue={handleContinue} />
      )}
      {curStage === Stage.PlayingGame && (
        <GameSimulator
          activePlayers={activePlayers}
          firstServe={firstServe}
          onCancel={handleCancel}
          onAdd={onAdd}
        />
      )}
    </div>
  );
};
