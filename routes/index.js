var express = require('express');
const Router = require('express-promise-router');
const router = new Router();
const pg = require('pg')
const path = require('path')
const parse = require('pg-connection-string').parse;
const connectionOptions = parse(process.env.DATABASE_URL || 'postgres://dbuser:password@localhost:5432/scheduler');
// {
// 	user: 'dbuser',
// 	password: 'password',
// 	host: 'localhost',
// 	port: '5432',
// 	database: 'scheduler'}
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
		if (!checkUpdate(req)) res.status(403);

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
	async function checkUpdate(req, id, type){
		console.log('checkupdate')
		var query;
		if (api_endpoint === "departments"){
		    query = `SELECT departments.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_departments' INNER JOIN departments ON 1=1 GROUP BY departments.id`;
		}
		else if (api_endpoint === "courses"){
			if (type=='dept')
				query = `SELECT courses.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_course' INNER JOIN courses ON courses.department=\'${id}\' GROUP BY courses.id`;
			else {
				query = `SELECT courses.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_course' INNER JOIN courses ON courses.id=\'${id}\' INNER JOIN departments ON departments.id=courses.department AND departments.id=permissions.department GROUP BY courses.id`;

			}
		}
		else if (api_endpoint === "blocks"){
			query = `SELECT blocks.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_schedule' INNER JOIN teachers ON teachers.department=permissions.department INNER JOIN blocks ON blocks.teacher_id=teachers.id GROUP BY blocks.id`
		}
		else if (api_endpoint === "users"){
			query = `SELECT * FROM users WHERE EXISTS(SELECT users.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_permissions' GROUP BY users.id)`
		}
		query = "SELECT 1 WHERE EXISTS (" + query + ")";
		console.log(query)
		return (await pool.query(query).then(r => {console.log(r.rows.length); return r.rows.length> 0}));
	}
	router.get('/api/v1/' + api_endpoint, async(req, res, next) => {
		var query;
		if (api_endpoint === "departments"){
		    query = `SELECT departments.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_departments' INNER JOIN departments ON 1=1 GROUP BY departments.id`;
		}
		else if (api_endpoint === "courses"){
			query = `SELECT courses.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_course' INNER JOIN courses ON courses.department=permissions.department GROUP BY courses.id`;
		}
		else if (api_endpoint === "blocks"){
			query = `SELECT blocks.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_schedule' INNER JOIN teachers ON teachers.department=permissions.department INNER JOIN blocks ON blocks.teacher_id=teachers.id GROUP BY blocks.id`
		}
		else if (api_endpoint === "users"){
			query = `SELECT * FROM users WHERE EXISTS(SELECT users.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_permissions' GROUP BY users.id)`
		}
		console.log(query)

		pool.query(query ? query : 'SELECT * FROM ' + api_endpoint).then((res1) => {console.log("Finish GET");res.json((res1.rows))});
	});
	router.put('/api/v1/' + api_endpoint + "/:id", async(req, res, next) => {
		const id = req.params.id;
		if (!(await checkUpdate(req, id))) res.status(403);
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
		if (!checkUpdate(req)) res.status(403);

		const id = req.params.id;
		console.log("Delete " + id);
		await pool.query('DELETE FROM ' + api_endpoint + " WHERE id=($1)", [id]);
		await getAll(pool, api_endpoint, res);
	})
}
handleCRUD('departments', ["id", "name"]);
handleCRUD('courses', ["id", "department", "coursename", "shortname"]);
handleCRUD('blocks', ["id", "teacher_id", "course_id", "room", "time"])
handleCRUD('users', ['email']);
router.post('/api/v1/teachers', async (req, res, next) => {
	const results = [];
	
	const data = {name: req.param('name'), department: req.param('department')};
	const query = "SELECT 1 WHERE EXISTS (" + `SELECT teachers.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_teacher' INNER JOIN teachers ON teachers.department=permissions.department AND teachers.department=${data.department} GROUP BY teachers.id` + ')';
	console.log(query)
	await pool.query(query).then(r => {if (r.rows.length == 0) {res.status(403);throw 1;}});
	await pool.query('INSERT INTO teachers(lastname, department) values ($1, $2)', [data.name, data.department]);
	await getAll(pool, 'teachers', res);
	}
);

router.get('/api/v1/teachers', async (req, res, next) => {
	var query = `SELECT teachers.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_teacher' INNER JOIN teachers ON teachers.department=permissions.department GROUP BY teachers.id`
	pool.query(query).then(
		(res1) => {res.json((res1.rows))});
});

router.put('/api/v1/teachers/:teacher_id', async (req, res, next) => {
	const id = req.params.teacher_id;
	const query = "SELECT 1 WHERE EXISTS (" + `SELECT teachers.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_teacher' INNER JOIN teachers ON teachers.department=permissions.department AND teachers.id=${id} GROUP BY teachers.id` + ')';
	console.log(query)
	await pool.query(query).then(r => {if (r.rows.length == 0) {res.status(403);throw 1;}});
	const data = {name: req.body.name, department: req.body.department};
	await pool.query('UPDATE teachers SET lastname=($1), department=($2) where id=($3)', [data.name, data.department, id]);
	pool.query('SELECT * FROM teachers').then(
		(res1) => {res.json((res1.rows))});
}
);
router.delete('/api/v1/teachers/:teacher_id', async (req, res, next) => {
	const id = req.params.teacher_id;
	const query = "SELECT 1 WHERE EXISTS (" + `SELECT teachers.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='edit_teacher' INNER JOIN teachers ON teachers.department=permissions.department AND teachers.id=${id} GROUP BY teachers.id` + ')';
	await pool.query(query).then(r => {if (r.rows.length == 0) {res.status(403);throw 1;}});
	await pool.query('DELETE FROM teachers WHERE id=($1)', [id]);

	pool.query('SELECT * FROM teachers').then(
		(res1) => {res.json((res1.rows))});
});

router.get('/api/v1/user', async (req, res, next) => {
	var email = req.user.profile.emails[0].value;
	var id = req.user.profile.id;
	await pool.query('SELECT * FROM users WHERE email=($1)', [email]).then(
	async  (r) => {
		console.log("Select finished")
		console.log(r.rows)
	 	if (r.rows.length == 0){
	 		return pool.query('INSERT INTO users (email) VALUES ($1)', [email]);

		}});
	console.log("Insert finished")
	res.json(req.user);
})

router.get('/api/v1/roles', async (req, res, next) => {
	console.log("Roles")
	await pool.query('SELECT * FROM roles WHERE ' + `EXISTS(SELECT users.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_permissions' GROUP BY users.id)`).then(r => res.json(r.rows));
})

router.get('/api/v1/user_role', async (req, res, next) => {
	var data = {};
	await pool.query('SELECT id FROM users').then(async r => {
		for (var i = 0; i<r.rows.length; i++){
			data[r.rows[i].id] = await pool.query('SELECT role_id FROM user_role WHERE user_id=($1) AND ' + `EXISTS(SELECT users.* FROM users INNER JOIN user_role ON users.id=user_role.user_id AND users.email=\'${req.user.profile.emails[0].value}\' INNER JOIN roles ON roles.id=user_role.role_id INNER JOIN role_permissions ON role_permissions.role_id=roles.id INNER JOIN permissions ON permissions.id=role_permissions.permission_id AND permissions.name='view_permissions' GROUP BY users.id)`, [r.rows[i].id]).then(a => a.rows);
		}
	});
	console.log(data);
	res.json(data);
})
router.put('/api/v1/user_role/:id', async(req, res, next) => {
	const id = req.params.id;
	console.log(req.body)
	await pool.query('DELETE FROM user_role WHERE user_id=$1', [id]);
	for (var i = 0; i<req.body.changed.length; i++){
		await pool.query('INSERT INTO user_role(user_id, role_id) VALUEs ($1, $2)', [id, req.body.changed[i]]);
	}
})
module.exports = router;