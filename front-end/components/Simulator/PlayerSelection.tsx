import React from "react";
import { InfoCard } from "../InfoCard";
import { Player } from "../../util/types";

interface Props {
  players: Player[];
  onContinue: () => void;
}

export const PlayerSelection: React.FC<Props> = ({ players, onContinue }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around">
      <InfoCard
        title="Live Game"
        info="Here you can interactively play an entire game. Pick the two teams by clicking on the player names below. Afterwards select who has the first serve and hit 'Let's Go!'"
      />
      <div>
        <button
          className="px-2 py-4 bg-blue-500 hover:bg-blue-700 rounded-lg shadow-lg"
          onClick={onContinue}
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
};
