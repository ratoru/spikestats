import React, { useState } from "react";
import { PlayerButton } from "../Game/PlayerButton";
import { Player } from "../../util/types";

interface Props {
  players: Player[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export const AddGroupPlayers: React.FC<Props> = ({
  players,
  onAdd,
  onDelete,
}) => {
  const [input, setInput] = useState("");
  // Use chips to ensure that everything gets rerendered correctly.
  const [chips, setChips] = useState<string[]>(
    players.map((player) => player.name)
  );

  const handleClick = () => {
    onAdd(input);
    const newChips = [...chips, input];
    setChips(newChips);
    setInput("");
  };

  const handleDelete = (name: string) => {
    let key = players.map((player) => player.name).indexOf(name);
    onDelete(players[key].uuid);
    const newChips = chips.filter((chip) => {
      return name !== chip;
    });
    setChips(newChips);
  };

  const checkCorrect = () => {
    return input !== "" && input.length < 20 && !chips.includes(input);
  };

  return (
    <div className="h-full">
      <div className="flex flex-row flex-wrap justify-center items-center w-full">
        {chips.map((chip) => {
          return (
            <PlayerButton
              key={chip}
              name={chip}
              color="gray"
              isSelected={true}
              onClick={() => handleDelete(chip)}
              disabled={false}
            />
          );
        })}
      </div>
      <div className="flex flex-nowrap w-full my-12 justify-around">
        <div className="flex relative w-2/3">
          <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
          <input
            type="text"
            ref={(input) => input && input.focus()}
            autoFocus
            autoComplete="off"
            id="player-with-icon"
            className={`form-input rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent ${
              checkCorrect() ? "focus:ring-blue-600" : "focus:ring-red-600"
            }`}
            placeholder="New Player"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && checkCorrect()) {
                handleClick();
              }
            }}
          />
          {!checkCorrect() && (
            <p className="absolute text-sm text-red-600 -bottom-6">
              {input.length === 0
                ? "Name can't be empty."
                : "Name must be unique."}
            </p>
          )}
        </div>
        <button
          type="button"
          className={`flex justify-center items-center py-2 px-4 text-white transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg ${
            checkCorrect()
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-default"
          }`}
          onClick={handleClick}
          disabled={!checkCorrect()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Add
        </button>
      </div>
    </div>
  );
};
