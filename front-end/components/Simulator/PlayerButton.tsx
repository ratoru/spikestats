import React from "react";
import { serve } from "../../util/icons";

interface Props {
  name: string;
  hasServe: boolean;
  isBlue: boolean;
  onClick: () => void;
}

/**
 *
 * @param isBlue Whether the player is on the blue team.
 * @param hasServe Whether the player currently has the serve.
 * @returns The appropriate color
 */
function getColor(hasServe: boolean, isBlue: boolean): string {
  if (hasServe) {
    return "yellow";
  }
  return isBlue ? "blue" : "red";
}

export const PlayerButton: React.FC<Props> = ({
  name,
  hasServe,
  isBlue,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-between items-center rounded-lg shadow-lg text-center text-xl font-semibold tracking-wide bg-${getColor(
        hasServe,
        isBlue
      )}-500 p-4`}
    >
      {name}
      {hasServe && (
        <div className="w-6 h-6 inline-flex items-center justify-center">
          {serve}
        </div>
      )}
    </button>
  );
};
