import {
  Game,
  Team,
  Players,
  ServeData,
  PlayerPointsDataInstance,
  PlayerWinsSliceDP,
  PlayerWinsTreeDP,
  WinPercentageDP,
} from "./types";

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
    points.set(game.blue_team[0], points.get(game.blue_team[0]) + scoreBlue);
    points.set(game.blue_team[1], points.get(game.blue_team[1]) + scoreBlue);
    points.set(game.red_team[0], points.get(game.red_team[0]) + scoreRed);
    points.set(game.red_team[1], points.get(game.red_team[1]) + scoreRed);
  }
  points.forEach((value, key) => {
    data.push({ name: players.get(key), points: value });
  });
  return data;
}

// Takes in a list of games and returns how often each player won (in relative terms).
export function getPlayerWinsSliceData(
  games: Game[],
  players: Players
): PlayerWinsSliceDP[] {
  const data: PlayerWinsSliceDP[] = [];
  // Should be of key: id, value: points.
  const wins = new Map(Array.from(players.keys()).map((key) => [key, 0]));
  const totalGames = new Map(Array.from(players.keys()).map((key) => [key, 0]));
  for (let game of games) {
    addTotalGames(game.blue_team, game.red_team, totalGames);
    if (game.score[0] > game.score[1]) {
      wins.set(game.blue_team[0], wins.get(game.blue_team[0]) + 1);
      wins.set(game.blue_team[1], wins.get(game.blue_team[1]) + 1);
    } else {
      wins.set(game.red_team[0], wins.get(game.red_team[0]) + 1);
      wins.set(game.red_team[1], wins.get(game.red_team[1]) + 1);
    }
  }
  wins.forEach((value, key) => {
    data.push({ name: players.get(key), wins: value / totalGames.get(key) });
  });
  return data;
}

function addTotalGames(
  blue_team: Team,
  red_team: Team,
  totalGames: Map<string, number>
): void {
  totalGames.set(blue_team[0], totalGames.get(blue_team[0]) + 1);
  totalGames.set(blue_team[1], totalGames.get(blue_team[1]) + 1);
  totalGames.set(red_team[0], totalGames.get(red_team[0]) + 1);
  totalGames.set(red_team[1], totalGames.get(red_team[1]) + 1);
}

// Gets a list of games and players and returns a list of PlayerWinsTreeDPs.
export function getPlayerWinsTreeData(
  games: Game[],
  players: Players
): PlayerWinsTreeDP[] {
  const wins = new Map<string, number>();
  const losses = new Map<string, number>();
  players.forEach((value, key) => {
    wins.set(key, 0);
    losses.set(key, 0);
  });
  for (let game of games) {
    const [winners, losers] =
      game.score[0] > game.score[1]
        ? [game.blue_team, game.red_team]
        : [game.red_team, game.blue_team];
    wins.set(winners[0], wins.get(winners[0]) + 1);
    wins.set(winners[1], wins.get(winners[1]) + 1);
    losses.set(losers[0], losses.get(losers[0]) + 1);
    losses.set(losers[1], losses.get(losers[1]) + 1);
  }
  const data: PlayerWinsTreeDP[] = [];
  players.forEach((value, key) => {
    const dataPoint: PlayerWinsTreeDP = {
      name: value,
      children: [
        { name: "Wins", value: wins.get(key) },
        { name: "Losses", value: losses.get(key) },
      ],
    };
    data.push(dataPoint);
  });
  return data;
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

  for (let game of games) {
    const player1 = game.blue_team[0];
    const player2 = game.blue_team[1];
    const player3 = game.red_team[0];
    const player4 = game.red_team[1];
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
    date: game.date_played,
    winPercentage: (values.wins / values.total) * 100,
  };
  dataIds.set(id, [...dataIds.get(id), dataPoint]);
}
