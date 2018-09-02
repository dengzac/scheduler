const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:password@localhost:5432/scheduler';

(async function(){
const client = new pg.Client({connectionString: connectionString});
await client.connect();
await client.query('DROP TABLE IF EXISTS teachers CASCADE');
await client.query('DROP TABLE IF EXISTS courses CASCADE');
await client.query('DROP TABLE IF EXISTS blocks CASCADE');
await client.query('DROP TABLE IF EXISTS departments CASCADE')
await client.query(
		'CREATE TABLE departments(id INT PRIMARY KEY not null, name VARCHAR(255))');
await client.query(
		'CREATE TABLE teachers(id SERIAL PRIMARY KEY, lastname VARCHAR(255) not null, department INT REFERENCES departments(id))');
await client.query(
		'CREATE TABLE courses(id VARCHAR(255) PRIMARY KEY not null CHECK(id <> \'\'), department INT REFERENCES departments(id), coursename VARCHAR(255), shortname VARCHAR(255))');
await client.query(
		'CREATE TABLE blocks(id INT PRIMARY KEY, teacher_id INT REFERENCES teachers(id), course_id VARCHAR(255) REFERENCES courses(id), room INT, time INT)');


await client.end();
})();
