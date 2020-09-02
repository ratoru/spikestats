// This file provides helper functions to tranform the data from the server
// into data the react components can use.
import { Game, Team, Players } from "./types";

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

interface PlayerServer {
  id: string;
  playername: string;
}
export function playerVecToMap(playerVec: PlayerServer[]): Players {
  return new Map(
    playerVec.map((play): [string, string] => [play.id, play.playername])
  );
}
