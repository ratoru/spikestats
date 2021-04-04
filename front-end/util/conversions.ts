import { Player, Team } from "./types";

function idToPlayerName (id: string, players: Player[]): string {
    for (let player of players) {
        if (player.uuid === id) {
            return player.name;
        }
    }
    return "Not Found";
}

export function teamToNames (teamIds: Team, players: Player[]): string {
    return teamIds.map((id) => idToPlayerName(id, players)).join(", ");
}