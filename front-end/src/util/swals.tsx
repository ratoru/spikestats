import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 as uuidv4 } from "uuid";
import { AddChips } from "../components/addComponents/AddChips";
import { AddScoreField } from "../components/addComponents/AddScoreField";
import { AddServe } from "../components/addComponents/AddServe";
import { AddConfirm } from "../components/addComponents/AddConfirm";
import { AddGroupPlayers } from "../components/addComponents/AddGroupPlayers";
import { GroupConfirm } from "../components/addComponents/GroupConfirm";
import { Team, Players, ServeTeam } from "./types";

// Template for error messages.
export const errorToast = Swal.mixin({
  title: "Something went wrong with the server!",
  icon: "error",
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

interface Selection {
  blue_team: Team;
  red_team: Team;
}
export async function teamSelection(players: Players): Promise<Selection> {
  const emptyTeamBlue: Team = ["", ""];
  const emptyTeamRed: Team = ["", ""];
  const selectedTeams = { blue_team: emptyTeamBlue, red_team: emptyTeamRed };
  const handleSelectPlayer = (id: string, isBlue: boolean) => {
    if (isBlue) {
      if (selectedTeams.blue_team[0] === "") {
        selectedTeams.blue_team[0] = id;
      } else {
        selectedTeams.blue_team[1] = id;
      }
    } else {
      if (selectedTeams.red_team[0] === "") {
        selectedTeams.red_team[0] = id;
      } else {
        selectedTeams.red_team[1] = id;
      }
    }
  };
  const handleRemovePlayer = (id: string, isBlue: boolean) => {
    if (isBlue) {
      if (selectedTeams.blue_team[0] === id) {
        selectedTeams.blue_team[0] = "";
      } else {
        selectedTeams.blue_team[1] = "";
      }
    } else {
      if (selectedTeams.red_team[0] === id) {
        selectedTeams.red_team[0] = "";
      } else {
        selectedTeams.red_team[1] = "";
      }
    }
  };
  const AddGameSwal = withReactContent(Swal);
  const { value: finalSelection } = await AddGameSwal.fire({
    title: "Choose Teams",
    html: (
      <AddChips
        players={players}
        onSelect={handleSelectPlayer}
        onDelete={handleRemovePlayer}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "0",
    preConfirm: () => {
      if (
        selectedTeams.blue_team[0] === "" ||
        selectedTeams.blue_team[1] === "" ||
        selectedTeams.red_team[0] === "" ||
        selectedTeams.red_team[1] === ""
      ) {
        AddGameSwal.showValidationMessage("You must select four players.");
        return false;
      }
      return selectedTeams;
    },
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (!finalSelection) {
      reject();
    } else {
      resolve(finalSelection);
    }
  });
}

// Score Selection
export async function scoreSelection(
  players: Players,
  teamSelection: Selection
): Promise<[number, number]> {
  let blueScore: number;
  let redScore: number;
  const handleChange = (score: number, isBlue: boolean) => {
    isBlue ? (blueScore = score) : (redScore = score);
  };
  const scoreSwal = withReactContent(Swal);
  const { value: finalScore } = await scoreSwal.fire({
    title: "Enter the Score",
    html: (
      <AddScoreField
        players={players}
        teams={teamSelection}
        blueScore={blueScore}
        redScore={redScore}
        onChange={handleChange}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "1",
    preConfirm: () => {
      if (blueScore >= 0 && redScore >= 0 && blueScore !== redScore) {
        const score: [number, number] = [blueScore, redScore];
        return score;
      }
      scoreSwal.showValidationMessage("The score can't be a tie.");
      return false;
    },
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (!finalScore) {
      reject();
    } else {
      resolve(finalScore);
    }
  });
}

// Serve Selection
export async function serveSelection(
  players: Players,
  teamSelection: Selection,
  score: [number, number]
): Promise<ServeTeam> {
  let curServeSelection = "";
  const handleChange = (newSelection: string) => {
    curServeSelection = newSelection;
  };

  const scoreSwal = withReactContent(Swal);
  const { value: teamWithServe } = await scoreSwal.fire({
    title: "Initial Serve",
    html: (
      <AddServe
        players={players}
        teams={teamSelection}
        score={score}
        onChange={handleChange}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "2",
    preConfirm: () => {
      if (curServeSelection === "") {
        scoreSwal.showValidationMessage("Select who had the initial serve.");
        return false;
      }
      return curServeSelection;
    },
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (!teamWithServe) {
      reject();
    } else {
      resolve(teamWithServe === "blue" ? ServeTeam.Blue : ServeTeam.Red);
    }
  });
}

// Confirm Selection
export async function confirmSelection(
  players: Players,
  teamSelection: Selection,
  score: [number, number],
  serve: ServeTeam
): Promise<boolean> {
  const scoreSwal = withReactContent(Swal);
  const result = await scoreSwal.fire({
    icon: "success",
    title: "Confirm Game",
    html: (
      <AddConfirm
        players={players}
        teams={teamSelection}
        score={score}
        serve={serve}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Finish",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "3",
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (!result) {
      reject();
    } else {
      resolve(true);
    }
  });
}

// Group's Player Selection
export async function groupPlayerSelection(
  groupname: string
): Promise<Players> {
  const players: Players = new Map();
  const handleAdd = (input: string) => {
    players.set(uuidv4(), input);
  };
  const handleDelete = (playerId: string) => {
    console.log("Delete", players.get(playerId));
    players.delete(playerId);
  };

  const addGroupPlayersSwal = withReactContent(Swal);
  const { value: playerMap } = await addGroupPlayersSwal.fire({
    title: `${groupname}`,
    html: (
      <AddGroupPlayers
        players={players}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    ),
    showCancelButton: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3"],
    currentProgressStep: "1",
    preConfirm: () => {
      if (players.size < 4) {
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
  players: Players
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
