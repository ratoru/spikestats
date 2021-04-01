import React from "react";
import { useRouter } from "next/router";
import { Group, Player } from "../../util/types";

interface Props {
  group: Group;
  switchColor?: boolean;
  clickable?: boolean;
}

export const GroupCard: React.FC<Props> = ({ group, switchColor = false }) => {
  const router = useRouter();

  // Navigates to the games page for that group.
  const openGroup = () => {
    const query = { gId: group.id };
    const url = { pathname: "/stats/[groupname]", query };
    const urlAs = { pathname: `/stats/${group.groupname}`, query };
    router.push(url, urlAs);
  };

  return (
    <button
      onClick={openGroup}
      className="w-4/5 sm:w-1/2 md:w-1/2 lg:w-1/3 px-4 py-4 bg-white my-12 rounded-lg shadow-lg group"
    >
      <div
        className={`flex items-center mx-auto justify-center h-12 w-12 rounded-md ${
          switchColor ? `bg-yellow-500` : `bg-blue-500`
        } text-white -mt-10`}
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
      <h3
        className={`text-2xl sm:text-xl text-gray-700 text-center font-semibold mt-4 group-hover:${
          switchColor ? `text-yellow-600` : `text-blue-600`
        }`}
      >
        {group.groupname}
      </h3>
      <p className="text-md text-center text-gray-500 p-4">
        {group.players.map((player) => player.name).join(", ")}
      </p>
    </button>
  );
};
