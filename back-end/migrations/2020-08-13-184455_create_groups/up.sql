-- Your SQL goes here

CREATE TABLE groups
(
    id VARCHAR(36) PRIMARY KEY NOT NUll,
    name VARCHAR NOT NULL,
    user_id VARCHAR(36) NOT NULL
)