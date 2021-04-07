import React from "react";

interface Props {
  name: string;
  color: string;
  onClick: () => void;
  isSelected: boolean;
}

export const PlayerButton: React.FC<Props> = ({
  name,
  color,
  onClick,
  isSelected,
}) => {
  return (
    <button
      className={`bg-${color}-200 text-${color}-600 py-1 px-3 rounded-full text-sm m-2`}
      onClick={onClick}
    >
      {name}
      {isSelected && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 inline w-4 h-4"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </button>
  );
};
