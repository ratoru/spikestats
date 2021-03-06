import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AddChips } from "./AddChips";
import { AddScoreField } from "./AddScoreField";
import { AddServe } from "./AddServe";
import { AddConfirm } from "./AddConfirm";
import { Team, Player, ServeTeam } from "../../util/types";

interface Selection {
  blue_team: Team;
  red_team: Team;
}
export async function teamSelection(players: Player[]): Promise<Selection> {
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
    title: "Time to make teams!",
    html: (
      <AddChips
        players={players}
        onSelect={handleSelectPlayer}
        onDelete={handleRemovePlayer}
      />
    ),
    showCancelButton: true,
    reverseButtons: true,
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
  players: Player[],
  teamSelection: Selection
): Promise<[number, number]> {
  let blueScore = "";
  let redScore = "";
  const handleChange = (score: string, isBlue: boolean) => {
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
    reverseButtons: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "1",
    preConfirm: () => {
      const blueScoreNum = parseInt(blueScore);
      const redScoreNum = parseInt(redScore);
      if (
        blueScoreNum >= 0 &&
        redScoreNum >= 0 &&
        blueScoreNum !== redScoreNum
      ) {
        const score: [number, number] = [blueScoreNum, redScoreNum];
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
  players: Player[],
  teamSelection: Selection,
  score: [number, number]
): Promise<ServeTeam> {
  let curServeSelection: ServeTeam = ServeTeam.Blue;
  const handleChange = () => {
    curServeSelection =
      curServeSelection === ServeTeam.Blue ? ServeTeam.Red : ServeTeam.Blue;
  };

  const serveSwal = withReactContent(Swal);
  const { isDismissed } = await serveSwal.fire({
    title: "First Serve",
    html: (
      <AddServe
        players={players}
        teams={teamSelection}
        score={score}
        onChange={handleChange}
      />
    ),
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonText: "Next &rarr;",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "2",
    // preConfirm: () => {
    //   if (curServeSelection === undefined) {
    //     scoreSwal.showValidationMessage("Select who had the initial serve.");
    //     return false;
    //   }
    //   return curServeSelection;
    // },
  });
  // Correct and neccessary syntax? Yes.
  return new Promise((resolve, reject) => {
    if (isDismissed) {
      reject();
    } else {
      resolve(curServeSelection);
    }
  });
}

// Confirm Selection
export async function confirmSelection(
  players: Player[],
  teamSelection: Selection,
  score: [number, number],
  serve: ServeTeam
): Promise<boolean> {
  const confirmSwal = withReactContent(Swal);
  const { isDismissed } = await confirmSwal.fire({
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
    reverseButtons: true,
    confirmButtonText: "Finish",
    progressSteps: ["1", "2", "3", "4"],
    currentProgressStep: "3",
  });
  // Correct and neccessary syntax??
  return new Promise((resolve, reject) => {
    if (isDismissed) {
      reject();
    } else {
      resolve(true);
    }
  });
}
