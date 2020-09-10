// This file provides helper functions to tranform the data from the server
// into data the react components can use.
import { Game, Team, Players, ServeTeam } from "./types";

// Takes in a Game and converts it to the format used in the GameTable.
export function gameToRow(game: Game, players: Players) {
  return {
    id: game["id"],
    blue_team: teamToString(game["blue_team"], players),
    red_team: teamToString(game["red_team"], players),
    score: game["score"].join(":"),
    serve: game["serve"],
    date_played: game["date_played"],
  };
}

function teamToString(team: Team, players: Players): string {
  return team.map((playerId) => players.get(playerId)).join(", ");
}

interface PlayerOnServer {
  id: string;
  playername: string;
}
export function playerVecToMap(playerVec: PlayerOnServer[]): Players {
  return new Map(
    playerVec.map((play): [string, string] => [play.id, play.playername])
  );
}
