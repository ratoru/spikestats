import { Player, Team } from "./types";

/**
 * Converts the id of a player to their name.
 *
 * @param id Uuid of the player.
 * @param players Array of players.
 * @returns Name of the player
 */
export function idToPlayerName(id: string, players: Player[]): string {
  return players.find((player) => {
    return player.uuid === id;
  }).name;
}

/**
 * Given a team returns the names of the players seperated by a comma.
 *
 * @param teamIds The Team array.
 * @param players The players array.
 * @returns The names of the players.
 */
export function teamToNames(teamIds: Team, players: Player[]): string {
  return teamIds.map((id) => idToPlayerName(id, players)).join(", ");
}

/**
 * Converts an array of total wins to the corresponding win percentage.
 * Divides by index and multiplies by 100.
 *
 * @param numbers The array containing the total number of wins.
 * @returns Array containing percentage numbers.
 */
export function totalWinsToPercentage(numbers: number[]): number[] {
  return numbers.map((val, i) => (val / (i + 1)) * 100);
}
