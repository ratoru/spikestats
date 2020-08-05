import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AddChips } from "../components/addComponents/AddChips";
import { AddScoreField } from "../components/addComponents/AddScoreField";
import { AddServe } from "../components/addComponents/AddServe";
import { AddConfirm } from "../components/addComponents/AddConfirm";
import { Team, Players, ServeTeam } from "./types";

// Template for error messages.
export const errorToast = Swal.mixin({
  title: "Something went wrong!",
  icon: "error",
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
});

interface Selection {
  blueTeam: Team;
  redTeam: Team;
}
export async function teamSelection(players: Players): Promise<Selection> {
  const emptyTeamBlue: Team = [-1, -1];
  const emptyTeamRed: Team = [-1, -1];
  const selectedTeams = { blueTeam: emptyTeamBlue, redTeam: emptyTeamRed };
  const handleSelectPlayer = (id: number, isBlue: boolean) => {
    if (isBlue) {
      if (selectedTeams.blueTeam[0] === -1) {
        selectedTeams.blueTeam[0] = id;
      } else {
        selectedTeams.blueTeam[1] = id;
      }
    } else {
      if (selectedTeams.redTeam[0] === -1) {
        selectedTeams.redTeam[0] = id;
      } else {
        selectedTeams.redTeam[1] = id;
      }
    }
  };
  const handleRemovePlayer = (id: number, isBlue: boolean) => {
    if (isBlue) {
      if (selectedTeams.blueTeam[0] === id) {
        selectedTeams.blueTeam[0] = -1;
      } else {
        selectedTeams.blueTeam[1] = -1;
      }
    } else {
      if (selectedTeams.redTeam[0] === id) {
        selectedTeams.redTeam[0] = -1;
      } else {
        selectedTeams.redTeam[1] = -1;
      }
    }
  };
  const AddGameSwal = withReactContent(Swal);
  const { value: finalSelection } = await AddGameSwal.fire({
    title: "Choose Teams",
    html: (
      <AddChips
        players={players}
        teams={selectedTeams}
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
        selectedTeams.blueTeam[0] === -1 ||
        selectedTeams.blueTeam[1] === -1 ||
        selectedTeams.redTeam[0] === -1 ||
        selectedTeams.redTeam[1] === -1
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
