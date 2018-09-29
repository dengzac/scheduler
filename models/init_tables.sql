DROP TABLE IF EXISTS "session";
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
CREATE TABLE departments(id INT PRIMARY KEY not null, name VARCHAR(255));
CREATE TABLE teachers(id SERIAL PRIMARY KEY, lastname VARCHAR(255) not null, department INT REFERENCES departments(id));
CREATE TABLE courses(id VARCHAR(255) PRIMARY KEY not null CHECK(id <> ''), department INT REFERENCES departments(id), coursename VARCHAR(255), shortname VARCHAR(255), _9 int DEFAULT 0, _10 int DEFAULT 0, _11 int DEFAULT 0, _12 int DEFAULT 0, semester INT DEFAULT 3);
CREATE TABLE blocks(id SERIAL PRIMARY KEY, teacher_id INT REFERENCES teachers(id), course_id VARCHAR(255) REFERENCES courses(id), room INT, time INT, seats INT);
CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE);
CREATE TABLE roles(id SERIAL PRIMARY KEY, name VARCHAR(255), department INT REFERENCES departments(id), unique(name, department));
CREATE UNIQUE INDEX roles_null_idx ON roles (name) WHERE department IS NULL;


CREATE TABLE user_role(id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), role_id INT REFERENCES roles(id));

CREATE TABLE permissions(id SERIAL PRIMARY KEY, name VARCHAR(255), department INT REFERENCES departments(id), unique (name, department));
CREATE TABLE role_permissions(role_id integer REFERENCES roles(id), permission_id integer REFERENCES permissions(id), unique(role_id, permission_id));


