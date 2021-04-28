import React from "react";
import { Player, Group } from "../../util/types";
import { GroupCard } from "./GroupCard";

interface GroupConfirmProps {
  groupname: string;
  players: Player[];
}

export const GroupConfirm: React.FC<GroupConfirmProps> = ({
  players,
  groupname,
}) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-4/5 px-4 py-4 bg-white my-12 rounded-lg border border-gray-200">
        <div
          className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-yellow-500 
        text-white -mt-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h3 className="text-2xl sm:text-xl text-gray-700 text-center font-semibold mt-4">
          {groupname}
        </h3>
        <p className="text-md text-center text-gray-500 p-4">
          {players.map((player) => player.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
