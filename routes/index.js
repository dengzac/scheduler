var express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const pg = require('pg')
const path = require('path')
const connectionOptions =
{
	user: 'dbuser',
	password: 'password',
	host: 'localhost',
	port: '5432',
	database: 'scheduler'}
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.sendFile(path.join(__dirname, ))
// });

async function getAll(pool, tableName, res){

	pool.query('SELECT * FROM ' + tableName).then(
		(res1) => {res.json((res1.rows))});	
}
const pool = new pg.Pool(connectionOptions);



function handleCRUD(api_endpoint, params){
	router.post('/api/v1/' + api_endpoint, async (req, res, next) => {
		var data = {};
		var paramList = [];
		for (var name in params){
			console.log(params[name]);
			paramList.push(req.param(params[name]));
		}

		var paramString = "(";
		for (var name in params){
			paramString += params[name] + ", ";
		}
		paramString = paramString.slice(0, -2) + ") values (";
		for (var i = 1; i<=params.length; i++){
			paramString += "$" + i + ", ";
		}
		paramString = paramString.slice(0, -2) + ")";
		console.log(paramString)
		await pool.query('INSERT INTO ' + api_endpoint + paramString, paramList);
		await getAll(pool, api_endpoint, res);
	});
	router.get('/api/v1/' + api_endpoint, async(req, res, next) => {
		pool.query('SELECT * FROM ' + api_endpoint).then((res1) => {console.log("Finish GET");res.json((res1.rows))});
	});
	router.put('/api/v1/' + api_endpoint + "/:id", async(req, res, next) => {
		const id = req.params.id;
		var newParams = Object.keys(req.body)
		var data = newParams.map((k) => req.body[k]);
		//newParams = params;//params.slice(1);
		console.log(req.body)
		console.log(newParams)
		console.log(data)
		var paramString = "";
		var data = [];
		for (var i = 0; i<newParams.length; i++){
			paramString += newParams[i] + '=($' + (i+1) + '), '
			data.push(req.body[newParams[i]])
		}
		data.push(id);

		paramString = paramString.slice(0, -2) + " where id=($" + (newParams.length+1) + ')';
		console.log(paramString)
		await pool.query('UPDATE ' + api_endpoint + " SET " + paramString, data);
		await getAll(pool, api_endpoint, res);
	});
	router.delete('/api/v1/' + api_endpoint + "/:id", async(req, res, next) => {
		const id = req.params.id;
		console.log("Delete " + id);
		await pool.query('DELETE FROM ' + api_endpoint + " WHERE id=($1)", [id]);
		await getAll(pool, api_endpoint, res);
	})
}
handleCRUD('departments', ["id", "name"]);
handleCRUD('courses', ["id", "department", "coursename", "shortname"]);
router.post('/api/v1/teachers', async (req, res, next) => {
	const results = [];
	const data = {name: req.param('name'), department: req.param('department')};
	await pool.query('INSERT INTO teachers(lastname, department) values ($1, $2)', [data.name, data.department]);
	await getAll(pool, 'teachers', res);
	}
);

router.get('/api/v1/teachers', async (req, res, next) => {
	pool.query('SELECT * FROM teachers').then(
		(res1) => {res.json((res1.rows))});
});

router.put('/api/v1/teachers/:teacher_id', async (req, res, next) => {
	const id = req.params.teacher_id;
		
	const data = {name: req.body.name, department: req.body.department};
	await pool.query('UPDATE teachers SET lastname=($1), department=($2) where id=($3)', [data.name, data.department, id]);
	pool.query('SELECT * FROM teachers').then(
		(res1) => {res.json((res1.rows))});
}
);
router.delete('/api/v1/teachers/:teacher_id', async (req, res, next) => {
	const id = req.params.teacher_id;
	await pool.query('DELETE FROM teachers WHERE id=($1)', [id]);

	pool.query('SELECT * FROM teachers').then(
		(res1) => {res.json((res1.rows))});
});

module.exports = router;