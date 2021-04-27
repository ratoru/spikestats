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
  const color = getColor(hasServe, isBlue);

  return (
    <button
      onClick={onClick}
      className={`flex justify-between items-center bg-${color}-200 hover:bg-${color}-300 text-gray-700 py-2 px-5 md:py-3 md:px-6 md:text-xl shadow rounded-full text-lg font-medium focus:outline-none`}
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
