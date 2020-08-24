-- Your SQL goes here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);
CREATE TABLE groups (
    id uuid PRIMARY KEY,
    group_name TEXT NOT NULL,
    user_id uuid NOT NULL REFERENCES users(id)
);
CREATE TABLE players (
    id uuid PRIMARY KEY,
    player_name TEXT NOT NULL,
    group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE
);
CREATE TABLE games (
    id uuid PRIMARY KEY,
    blue_team uuid ARRAY [2] NOT NULL,
    red_team uuid ARRAY [2] NOT NULL,
    score SMALLINT ARRAY [2] NOT NULL,
    serve BOOLEAN NOT NULL,
    date_played DATE NOT NULL,
    group_id uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE
);