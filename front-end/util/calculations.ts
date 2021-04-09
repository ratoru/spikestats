// createMap with all data. Called for the first time and whenever game gets deleted.
// addGame: adds one game to map. Called after play.
// Total games.
// Toal Points scored.
// player.uuid -> { gamesPlayed, [winPercentage] }
// team -> { gamesPlayed, [winPercentage] }
// Maybe sort for teams.
import { Game, Player, ServeTeam } from "./types";

interface IndividualStats {
    gamesPlayed: number;
    pointsContributed: number;
    wins: number[];
}

interface StatsMap {
    [key: string]: IndividualStats;
}

export interface AllStats {
    totalGames: number;
    totalPoints: number;
    servingTeamWins: number[];
    stats: StatsMap;
}

/**
 * This method returns an object containing all the statistics that can be extracted from the games array.
 * Time intensive since it calculates all values from scratch. 
 * 
 * @param games Array of games which the statistics will be extracted from.
 * @param players Array of all possible players that could be in a game. 
 * @returns AllStats object containing all the information.
 */
export function createStatsMap(games: Game[], players: Player[]): AllStats {
    let totalGames = 0;
    let totalPoints = 0;
    let servingTeamWins: number[] = [];
    let stats: StatsMap = players.reduce(function(map, obj) {
        map[obj.uuid] = { gamesPlayed: 0, pointsContributed: 0, wins: [] }
        return map;
    }, {}) 
    let statsObj: AllStats = { totalGames, totalPoints, servingTeamWins, stats};
    games.forEach((game) => { addStatsOfGame(statsObj, game) });
    return statsObj;
}

/**
 * Adds the statistics of a single game to the AllStats object. 
 * statsObj is passed by reference and will, therefore, be modified.
 * 
 * @param statsObj An already populated AllStats object. Will be modified.
 * @param game Individual game to be added to the statsObj
 */
export function addStatsOfGame(statsObj: AllStats, game: Game): void {
    // Increment totalGames and totalPoints
    addServingTeamWin(statsObj, game.serve === ServeTeam.Blue ? (game.score[0] > game.score[1]): (game.score[0] < game.score[1]) );
    statsObj.totalGames += 1;
    statsObj.totalPoints += game.score.reduce((a, b) => a + b, 0);
    // Update individual players
    addStatsForId(statsObj, game.blue_team[0], game.score[0], game.score[0] > game.score[1]);
    addStatsForId(statsObj, game.blue_team[1], game.score[0], game.score[0] > game.score[1]);
    addStatsForId(statsObj, game.red_team[0], game.score[1], game.score[0] < game.score[1]);
    addStatsForId(statsObj, game.red_team[1], game.score[1], game.score[0] < game.score[1]);
    // Update team or insert if doesn't exist.
    addStatsForId(statsObj, game.blue_team.sort().join(""), game.score[0], game.score[0] > game.score[1]);
    addStatsForId(statsObj, game.red_team.sort().join(""), game.score[1], game.score[0] < game.score[1]);
}

/**
 * Updates the stats for a player or team with uuid id according to the params passed in.
 * 
 * @param statsObj AllStats object that will be updated.
 * @param id Uuid of the player or team.
 * @param points Points the player contributed to.
 * @param won Whether the player won the game.
 */
function addStatsForId(statsObj: AllStats, id: string, points: number, won: boolean): void {
    let playerStats: IndividualStats = {gamesPlayed: 0, pointsContributed: 0, wins: []};
    if (!(id in statsObj.stats)) {
        playerStats.wins = [(won ? 1 : 0)];
    } else {
        playerStats = statsObj.stats[id];
        playerStats.wins.push(playerStats.wins[playerStats.gamesPlayed - 1] + (won ? 1 : 0));
    }
    playerStats.pointsContributed += points;
    playerStats.gamesPlayed += 1;
    statsObj.stats[id] = playerStats;
}

function addServingTeamWin(statsObj: AllStats, won: boolean): void {
    if (statsObj.servingTeamWins.length === 0) {
        statsObj.servingTeamWins.push((won ? 1 : 0));
    } else {
        statsObj.servingTeamWins.push(statsObj.servingTeamWins[statsObj.servingTeamWins.length - 1] + (won ? 1: 0));
    }
}