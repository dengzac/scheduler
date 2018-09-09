var express = require('express');
var router = express.Router();
const multer = require('multer')
const bodyParser = require('body-parser')
const xlsx = require('xlsx');
const pg = require('pg');
const parse = require('pg-connection-string').parse;
const connectionOptions = parse(process.env.DATABASE_URL || 'postgres://dbuser:password@localhost:5432/scheduler');
// {
// 	user: 'dbuser',
// 	password: 'password',
// 	host: 'localhost',
// 	port: '5432',
// 	database: 'scheduler'}
const pool = new pg.Pool(connectionOptions);

router.post('/api/v1/upload/courses', (req, res1, next) => {
	console.log(req);
	var file = req.files.file;
	file.mv(`${__dirname}/../public/uploads/${file.name}`, function(res){
		console.log("Done uploading")
		var workbook = xlsx.readFile(`${__dirname}/../public/uploads/${file.name}`);
		//console.log(workbook)
		var data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
		console.log(data);
		data = data.map((o) => [o['Course Code'], o['Department Number'], o['Course Name'], o['Short Name'], o['9th'], o['10th'], o['11th'], o['12th']]).filter(o => o[0] != null);
		console.log(data);
		const requests = data.map(o => {pool.query('INSERT INTO courses (id, department, coursename, shortname, _9, _10, _11, _12) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', o, function(err, res){
			next(err, res);
		});});
		Promise.all(requests).then(() =>{
		console.log('done import')
		res1.json({});});
	});
	
});

router.post('/api/v1/upload/teachers', (req, res1, next) => {
	var file = req.files.file;
	file.mv(`${__dirname}/../public/uploads/${file.name}`, res => {
		var workbook = xlsx.readFile(`${__dirname}/../public/uploads/${file.name}`);
		var data = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
		data = data.map(o => [o['Teacher'], o['Department Number']]).filter(o => o[0] != null);
		console.log(data);
		const requests = data.map(o => pool.query('INSERT INTO teachers (lastname, department) VALUES ($1, $2)', o, function(err, res){
			next(err, res);
		}));
		Promise.all(requests).then(() => {
		res1.json({});});
	});
})

module.exports = router;
