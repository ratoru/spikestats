-- Your SQL goes here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE groups (
    id uuid PRIMARY KEY,
    groupname TEXT NOT NULL,
    user_id uuid NOT NULL
);
CREATE TABLE players (
    id uuid PRIMARY KEY,
    playername TEXT NOT NULL,
    group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE
);
CREATE TABLE games (
    id uuid PRIMARY KEY,
    blue_team uuid ARRAY [2] NOT NULL,
    red_team uuid ARRAY [2] NOT NULL,
    score SMALLINT ARRAY [2] NOT NULL,
    serve BOOLEAN NOT NULL,
    date_played TIMESTAMP WITH TIME ZONE NOT NULL,
    group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE
);