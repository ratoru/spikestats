// This file defines the basic type structure of the data structures used.
export interface Group {
  id: string;
  groupname: string;
  players: Players;
}

export interface User {
  username: string;
  password: string;
}

// Two player Ids. (Both uuids)
export type Team = [string, string];

export enum ServeTeam {
  Blue,
  Red,
}

// Always in order teamBlue, teamRed.
type Score = [number, number];

export interface Game {
  id: string; // Uuid4
  blueTeam: Team;
  redTeam: Team;
  score: Score;
  serve: ServeTeam;
  date_played: Date;
}

export interface Player {
  uuid: string;
  name: string;
}

// export type Players = Map<Player["id"], Player["name"]>;
export type Players = Map<string, string>;

// Chart Data Definitons
// DP = data point
export type ServeData = [
  { name: string; value: number; disabled: boolean },
  { name: string; value: number }
];

export interface PlayerPointsDataInstance {
  name: string;
  points: number;
}

export interface PlayerWinsSliceDP {
  name: string;
  wins: number;
}

export interface PlayerWinsTreeDP {
  name: string;
  children: { name: string; value: number }[];
}

export interface WinPercentageDP {
  date: Date;
  winPercentage: number;
}
