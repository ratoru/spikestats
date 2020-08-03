import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AddChips } from "../components/AddChips";
import { Team, Players } from "./types";

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
    progressSteps: ["1", "2", "3"],
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
