// createMap with all data. Called for the first time and whenever game gets deleted.
// addGame: adds one game to map. Called after play.
// Total games.
// Toal Points scored.
// player.uuid -> { gamesPlayed, [winPercentage] }
// team -> { gamesPlayed, [winPercentage] }
// Maybe sort for teams.
import { probit } from "simple-statistics";
import { Game, Player, ServeTeam, Team } from "./types";

/**
 * Wins stores the total number of games won.
 * Divide by index to get win percentage.
 * Example: [1, 1, 2, 2, 3, 4, 5];
 */
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
    bestPlayer: Player;
    bestTeam: Team;
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
    // let stats: StatsMap = players.reduce(function(map, obj) {
    //     map[obj.uuid] = { gamesPlayed: 0, pointsContributed: 0, wins: [] }
    //     return map;
    // }, {}) 
    let statsObj: AllStats = { totalGames, totalPoints, servingTeamWins, bestPlayer: {uuid: "", name: ""}, bestTeam: ["", ""], stats: {}};
    // Add games.
    games.forEach((game) => { addStatsOfGame(statsObj, game) });
    // Identify best performers.
    updateBestPerformers(statsObj, players);
    return statsObj;
}

/**
 * Updates the bestPlayer and bestTeam field of statsObj.
 * 
 * @param statsObj Object containing all the statistics
 * @param players Players array
 */
export function updateBestPerformers(statsObj: AllStats, players: Player[]): void {
    statsObj.bestPlayer = getBestPlayer(statsObj, players);
    statsObj.bestTeam = getBestTeam(statsObj, players);
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

/**
 * Adds the corresponding entry to servingTeamWin.
 * 
 * @param statsObj The object containing all statistics that will be updated.
 * @param won Whether the team with the first serve won.
 */
function addServingTeamWin(statsObj: AllStats, won: boolean): void {
    if (statsObj.servingTeamWins.length === 0) {
        statsObj.servingTeamWins.push((won ? 1 : 0));
    } else {
        statsObj.servingTeamWins.push(statsObj.servingTeamWins[statsObj.servingTeamWins.length - 1] + (won ? 1: 0));
    }
}


const confidence = 0.95;
const z = probit(1-(1-confidence)/2);

/**
 * Returns the lower bound of Wilson score confidence interval for a Bernoulli parameter.
 * Read https://medium.com/@gattermeier/calculating-better-rating-scores-for-things-voted-on-7fa3f632c79d for more info.
 * Calculates a 95% confidence interval.
 * 
 * @param wins Number of wins.
 * @param n Number of total games.
 * @returns The lower bound of Wilson score confidence interval for a Bernoulli parameter.
 */
function lowerBound(wins: number, n: number = 0 ): number {
    if (n === 0 || n < 0 || wins < 0) return 0;
    // p̂, the fraction of upvotes
    const phat = 1.0 * wins / n;
    return (phat + z*z / (2*n) - z * Math.sqrt((phat * (1 - phat) + z*z / (4*n)) / n)) / (1 + z*z/n);
}

/**
 * Returns the best player.
 * 
 * @param stats The stats object that will be analyzed.
 * @param players The array of players.
 * @returns The uuid of the best player.
 */
function getBestPlayer(statsObj: AllStats, players: Player[]): Player {
    let bestPlayer: Player = {uuid: "", name: ""};
    let bestLowerBound: number = -1;
    for (let i = 0; i < players.length; i++) {
        let name = players[i].uuid;
        if (name in statsObj.stats) {
            let playerStats = statsObj.stats[name];
            let winLowerBound = lowerBound(playerStats.wins[playerStats.gamesPlayed - 1], playerStats.gamesPlayed);
            if (winLowerBound > bestLowerBound) {
                bestLowerBound = winLowerBound;
                bestPlayer = players[i];
            }
        }
    }
    return bestPlayer;
}

/**
 * Returns the best team by trying all possible combinations of players.
 * 
 * @param stats The stats object.
 * @param players Array of players.
 * @returns The Team (sorted) with the best lower bound of their win % confidence interval.
 */
function getBestTeam(statsObj: AllStats, players: Player[]): Team {
    let bestTeam: Team = ["", ""];
    let bestWinPercentage: number = -1;
    for (let i = 0; i < players.length - 1; i++) {
        for (let j = i; j < players.length - 1; j++) {
            let teamName: string = [players[i].uuid, players[j+1].uuid].sort().join('');
            if (teamName in statsObj.stats) {
              let teamStats = statsObj.stats[teamName];
              let winLowerBound = lowerBound(teamStats.wins[teamStats.gamesPlayed - 1], teamStats.gamesPlayed);
              if (winLowerBound > bestWinPercentage) {
                bestWinPercentage = winLowerBound;  
                bestTeam[0] = players[i].uuid;
                bestTeam[1] = players[j+1].uuid;
              }
            }
        }
    }
    return bestTeam.sort();
}