// This file defines the basic type structure of the data structures used.

// Two player Ids.
export type Team = [number, number];

export enum ServeTeam {
  Blue,
  Red,
}

// Always in order teamBlue, teamRed.
type Score = [number, number];

export interface Game {
  id: number;
  blueTeam: Team;
  redTeam: Team;
  score: Score;
  serve: ServeTeam;
  date: Date;
}

interface Player {
  id: number;
  name: string;
}

// export type Players = Map<Player["id"], Player["name"]>;
export type Players = Map<number, string>;

// Chart Data Definitons
export type ServeData = [
  { name: string; value: number; disabled: boolean },
  { name: string; value: number }
];
