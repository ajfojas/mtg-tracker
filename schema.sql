DROP DATABASE IF EXISTS "cardCollection";

CREATE DATABASE "cardCollection";

\c "cardCollection";

CREATE TABLE "cards" (
  PrimaryID     SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  id            VARCHAR(100) NOT NULL
);

/*  Execute this file from the command line by typing:
 *    create database with:
 *      psql -d postgres -a -f schema.sql
 *
 *    log into postgres with:
 *      sudo service postgresql restart
 *      psql -h localhost -d cardCollection -U student -W
*/