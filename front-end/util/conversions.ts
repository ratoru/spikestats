import { Player, Team } from "./types";

export function idToPlayerName (id: string, players: Player[]): string {
    return players.find(player => {return player.uuid === id}).name;
}

export function teamToNames (teamIds: Team, players: Player[]): string {
    return teamIds.map((id) => idToPlayerName(id, players)).join(", ");
}