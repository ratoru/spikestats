import React from "react";

interface Props {
  name: string;
  color: string;
  onClick: () => void;
  isSelected: boolean;
  disabled: boolean;
}

export const PlayerButton: React.FC<Props> = ({
  name,
  color,
  onClick,
  isSelected,
  disabled,
}) => {
  return (
    <button
      className={`bg-${color}-200 hover:bg-${color}-300 text-gray-600 py-2 px-5 flex flex-nowrap items-center shadow rounded-full text-lg font-medium m-2 focus:outline-none`}
      onClick={onClick}
      disabled={disabled}
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
          className="ml-1 inline w-5 h-5"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </button>
  );
};
