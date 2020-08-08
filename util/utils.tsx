// This file provides helper functions to tranform the data from the server
// into data the react components can use.
import {
  Game,
  Team,
  Players,
  ServeData,
  PlayerPointsDataInstance,
  PlayerWinsDP,
  WinPercentageDP,
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

// Takes in a list of games and returns how often each player won (in relative terms).
export function getPlayerWinsData(
  games: Game[],
  players: Players
): PlayerWinsDP[] {
  const data: PlayerWinsDP[] = [];
  // Should be of key: id, value: points.
  const wins = new Map(Array.from(players.keys()).map((key) => [key, 0]));
  const totalGames = new Map(Array.from(players.keys()).map((key) => [key, 0]));
  for (let game of games) {
    addTotalGames(game.blueTeam, game.redTeam, totalGames);
    if (game.score[0] > game.score[1]) {
      wins.set(game.blueTeam[0], wins.get(game.blueTeam[0]) + 1);
      wins.set(game.blueTeam[1], wins.get(game.blueTeam[1]) + 1);
    } else {
      wins.set(game.redTeam[0], wins.get(game.redTeam[0]) + 1);
      wins.set(game.redTeam[1], wins.get(game.redTeam[1]) + 1);
    }
  }
  wins.forEach((value, key) => {
    data.push({ name: players.get(key), wins: value / totalGames.get(key) });
  });
  return data;
}

function addTotalGames(
  blueTeam: Team,
  redTeam: Team,
  totalGames: Map<string, number>
): void {
  totalGames.set(blueTeam[0], totalGames.get(blueTeam[0]) + 1);
  totalGames.set(blueTeam[1], totalGames.get(blueTeam[1]) + 1);
  totalGames.set(redTeam[0], totalGames.get(redTeam[0]) + 1);
  totalGames.set(redTeam[1], totalGames.get(redTeam[1]) + 1);
}

// Gets a list of games and players and returns a map with a list of winrates over time mapped to
// each players name.
export function getWinPercentage(
  games: Game[],
  players: Players
): Map<string, WinPercentageDP[]> {
  const dataIds: Map<string, WinPercentageDP[]> = new Map();
  players.forEach((value, key) => dataIds.set(key, []));
  const valuesPerPlayer: Map<
    string,
    { wins: number; total: number }
  > = new Map();
  players.forEach((value, key) =>
    valuesPerPlayer.set(key, { wins: 0, total: 0 })
  );

  console.log(valuesPerPlayer);
  for (let game of games) {
    const player1 = game.blueTeam[0];
    const player2 = game.blueTeam[1];
    const player3 = game.redTeam[0];
    const player4 = game.redTeam[1];
    incrementNumTotal(player1, valuesPerPlayer);
    incrementNumTotal(player2, valuesPerPlayer);
    incrementNumTotal(player3, valuesPerPlayer);
    incrementNumTotal(player4, valuesPerPlayer);
    if (game.score[0] > game.score[1]) {
      incrementNumWins(player1, valuesPerPlayer);
      incrementNumWins(player2, valuesPerPlayer);
    } else {
      incrementNumWins(player3, valuesPerPlayer);
      incrementNumWins(player4, valuesPerPlayer);
    }
    setNewWinPercentageDP(player1, game, valuesPerPlayer, dataIds);
    setNewWinPercentageDP(player2, game, valuesPerPlayer, dataIds);
    setNewWinPercentageDP(player3, game, valuesPerPlayer, dataIds);
    setNewWinPercentageDP(player4, game, valuesPerPlayer, dataIds);
  }
  const finalData = new Map<string, WinPercentageDP[]>();
  dataIds.forEach((value, key) => {
    finalData.set(players.get(key), value);
  });
  console.log(finalData);
  return finalData;
}

function incrementNumTotal(
  id: string,
  valuesPerPlayer: Map<string, { wins: number; total: number }>
): void {
  const newPoint = { ...valuesPerPlayer.get(id) };
  newPoint.total = newPoint.total + 1;
  valuesPerPlayer.set(id, newPoint);
}

function incrementNumWins(
  id: string,
  valuesPerPlayer: Map<string, { wins: number; total: number }>
): void {
  const playerScore = valuesPerPlayer.get(id);
  valuesPerPlayer.set(id, {
    ...playerScore,
    wins: playerScore.wins + 1,
  });
}

function setNewWinPercentageDP(
  id: string,
  game: Game,
  valuesPerPlayer: Map<string, { wins: number; total: number }>,
  dataIds: Map<string, WinPercentageDP[]>
) {
  const values = valuesPerPlayer.get(id);
  const dataPoint: WinPercentageDP = {
    date: game.date,
    winPercentage: (values.wins / values.total) * 100,
  };
  dataIds.set(id, [...dataIds.get(id), dataPoint]);
}
