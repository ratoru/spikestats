// This file defines the basic type structure of the data structures used.
export interface Group {
  id: string;
  groupname: string;
  players: Player[];
}

// Two player Ids. (Both uuids)
export type Team = [string, string];

export enum ServeTeam {
  Blue,
  Red,
}

// Always in order teamBlue, teamRed.
type Score = [number, number];

// Follows Rust's naming convention to make sending data to the back-end easier.
export interface Game {
  id: string; // Uuid4
  blue_team: Team;
  red_team: Team;
  score: Score;
  serve: ServeTeam;
  date_played: Date;
}

export interface Player {
  uuid: string;
  name: string;
}
