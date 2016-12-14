BEGIN;

DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "server";
DROP TABLE IF EXISTS "server_uuid_url";

COMMIT;

BEGIN;

CREATE TABLE "user" (
  user_id SERIAL UNIQUE PRIMARY KEY,
  fname VARCHAR(30) NOT NULL,
  lname VARCHAR(30) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  joined_date DATE NOT NULL DEFAULT now()
);

CREATE TABLE server (
  server_id SERIAL UNIQUE PRIMARY KEY,
  server_name VARCHAR(50) NOT NULL,
  server_mac VARCHAR(12) UNIQUE NOT NULL,
  server_uuid VARCHAR(36) NOT NULL,
  created_date DATE NOT NULL DEFAULT now(),
  user_id INT NOT NULL
);

ALTER SEQUENCE server_server_id_seq RESTART WITH 1000;

CREATE TABLE server_uuid_url (
  server_uuid VARCHAR(36) PRIMARY KEY NOT NULL,
  server_url VARCHAR(255) NOT NULL
);

COMMIT;
