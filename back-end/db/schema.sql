DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;

\c songs_dev;

DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN
);