import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 as uuidv4 } from "uuid";
import { InfoCard } from "../InfoCard";
import { GroupCard } from "./GroupCard";
import { AddGroupPlayers } from "./AddGroupPlayers";
import { GroupConfirm } from "./GroupConfirm";
import { Player, Group } from "../../util/types";

interface GroupServer {
  id: string;
  groupname: string;
}

interface PlayerServer {
  id: string;
  playername: string;
}

// Group's Player Selection
export async function groupPlayerSelection(
  groupname: string
): Promise<Player[]> {
  let players: Player[] = [];
  const handleAdd = (input: string) => {
    players.push({ uuid: uuidv4(), name: input });
  };
  const handleDelete = (playerId: string) => {
    let index = players.map((player) => player.uuid).indexOf(playerId);
    if (index > -1) {
      players.splice(index, 1);
    }
  };

  const addGroupPlayersSwal = withReactContent(Swal);
  const { value: playerMap } = await addGroupPlayersSwal.fire({
    title: `${groupname}`,
    html: (
      <AddGroupPlayers
        players={players}
        key={`${players.length}`}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3"],
    currentProgressStep: "1",
    preConfirm: () => {
      if (players.length < 4) {
        addGroupPlayersSwal.showValidationMessage(
          "You need at least 4 players."
        );
        return false;
      }
      return players;
    },
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (!playerMap) {
      reject();
    } else {
      resolve(playerMap);
    }
  });
}

// Group Confirmation
export async function groupConfirmation(
  groupname: string,
  players: Player[]
): Promise<boolean> {
  const confirmSwal = withReactContent(Swal);
  const result = await confirmSwal.fire({
    title: "Confirm",
    icon: "success",
    html: <GroupConfirm groupname={groupname} players={players} />,
    showCancelButton: true,
    confirmButtonText: "Finish",
    progressSteps: ["1", "2", "3"],
    currentProgressStep: "2",
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (result.dismiss) {
      reject();
    } else {
      resolve(true);
    }
  });
}

export const GroupList: React.FC = () => {
  // Store groups in state
  const [groups, setGroups] = useState<Group[]>([]);

  // Get data from server.
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  // Add a group
  const handleAdd = async () => {
    let newGroup: Group = {
      id: uuidv4(),
      groupname: "",
      players: [],
    };

    // Ask for new group name.
    const { value: newGroupname } = await Swal.fire({
      title: "New Group Name",
      text: "Must be a unique group name.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Next &rarr;",
      input: "text",
      inputPlaceholder: "New group name",
      inputValidator: (value) => {
        if (!value) {
          return "Enter a name.";
        }
        for (let group of groups) {
          if (group.groupname === value) {
            return "Name is not unique!";
          }
        }
      },
      progressSteps: ["1", "2", "3"],
      currentProgressStep: "0",
    });
    if (!newGroupname) {
      return;
    }
    newGroup.groupname = `${newGroupname}`;

    groupPlayerSelection(newGroup.groupname)
      .then((createdPlayers) => {
        newGroup.players = createdPlayers;
        return groupConfirmation(newGroup.groupname, newGroup.players);
      })
      .then(async () => {
        const oldGroups = groups;
        // Update UI
        setGroups((groups) => [...groups, newGroup]);
        // Call server
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleAdd}
        className="flex items-center px-6 py-2 my-12 transition ease-in duration-200 uppercase font-semibold tracking-wide rounded-full text-blue-600 hover:bg-blue-600 hover:text-gray-50 border-2 border-blue-600 focus:outline-none shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 mr-2"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Group
      </button>
      {groups.length == 0 && (
        <InfoCard
          title="Group"
          info="A group tracks the stats of players that frequently play together. Once a group has been created players cannot be added. Add one by clicking the button above."
        />
      )}
      {groups.map((group, index) => {
        return (
          <GroupCard
            key={group.groupname}
            group={group}
            switchColor={index % 2 == 0}
          />
        );
      })}
    </div>
  );
};
