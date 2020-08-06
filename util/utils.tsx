// This file provides helper functions to tranform the data from the server
// into data the react components can use.
import {
  Game,
  Team,
  Players,
  ServeData,
  PlayerPointsDataInstance,
} from "./types";

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
  const wins = games.filter((game) => {
    return game.score[game.serve] > game.score[game.serve ? 0 : 1];
  }).length;
  const total = games.length;
  return (wins / total) * 100;
}

// Takes in a list of games and all players, and returns how many points
// each player scored.
export function getPlayerPointsData(
  games: Game[],
  players: Players
): PlayerPointsDataInstance[] {
  const data: PlayerPointsDataInstance[] = [];
  // Should be of key: id, value: points.
  const points = new Map(Array.from(players.keys()).map((key) => [key, 0]));
  for (let game of games) {
    const scoreBlue = game.score[0];
    const scoreRed = game.score[1];
    points.set(game.blueTeam[0], points.get(game.blueTeam[0]) + scoreBlue);
    points.set(game.blueTeam[1], points.get(game.blueTeam[1]) + scoreBlue);
    points.set(game.redTeam[0], points.get(game.redTeam[0]) + scoreRed);
    points.set(game.redTeam[1], points.get(game.redTeam[1]) + scoreRed);
  }
  points.forEach((value, key) => {
    data.push({ name: players.get(key), points: value });
  });
  return data;
}
