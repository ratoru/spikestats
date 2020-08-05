// This file provides helper functions to tranform the data from the server
// into data the react components can use.
import { Game, Team, Players, ServeData } from "./types";

// Takes in a Game and converts it to the format used in the GameTable.
export function gameToRow(game: Game, players: Players) {
  return {
    id: game["id"],
    blueTeam: teamToString(game["blueTeam"], players),
    redTeam: teamToString(game["redTeam"], players),
    score: game["score"].join(":"),
    serve: game["serve"],
    date: game["date"],
  };
}

function teamToString(team: Team, players: Players): string {
  return team.map((playerId) => players.get(playerId)).join(", ");
}

// Takes in a list of Games and returns serveData.
export function getServeData(games: Game[]): ServeData {
  const winPercentage = getServeWinPercentage(games);
  return [
    {
      name: "No Serve",
      value: 100 - winPercentage,
      disabled: true,
    },
    {
      name: "Serve",
      value: winPercentage,
    },
  ];
}

// Takes in a list of Games and returns the win percentage of the team
// with the inital serve.
function getServeWinPercentage(games: Game[]): number {
  return (
    games.filter((game) => {
      return game.score[game.serve] > game.score[~game.serve];
    }).length / games.length
  );
}
