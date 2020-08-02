// This file defines the basic type structure of the data structures used.

export interface Team {
  player1Id: number;
  player2Id: number;
}

enum ServeTeam {
  Blue,
  Red,
}

// Always in order teamBlue, teamRed.
type Score = [number, number];

export interface Game {
  id: number;
  teamBlue: Team;
  teamRed: Team;
  score: Score;
  serve: ServeTeam;
  date: Date;
}

interface Player {
  id: number;
  name: string;
}

type Players = Map<number, string>;
