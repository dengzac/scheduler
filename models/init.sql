DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS departments CASCADE;
CREATE TABLE departments(id INT PRIMARY KEY not null, name VARCHAR(255));
CREATE TABLE teachers(id SERIAL PRIMARY KEY, lastname VARCHAR(255) not null, department INT REFERENCES departments(id));
CREATE TABLE courses(id VARCHAR(255) PRIMARY KEY not null CHECK(id <> ''), department INT REFERENCES departments(id), coursename VARCHAR(255), shortname VARCHAR(255));
CREATE TABLE blocks(id INT PRIMARY KEY, teacher_id INT REFERENCES teachers(id), course_id VARCHAR(255) REFERENCES courses(id), room INT, time INT);
