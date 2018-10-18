var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload')
var cors = require('cors')
var app = express();
const passport = require('passport');
require('dotenv').config();
const auth = require('./auth')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

auth(passport)
app.use(session({
	store: new pgSession({
		conString: process.env.DATABASE_URL || 'postgres://dbuser:password@localhost:5432/scheduler'}), 
	secret: process.env.SESSION_SECRET || 'default_secret',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors())
app.use(fileUpload());

app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));
app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/'
	}),
	(req, res) => {res.redirect('/')}
);
const checkLogin =  (req, res, next) => {
	if (req.isAuthenticated()){ 
		//console.log(req.user)
		next();
	}
	else {
		res.status(403).json({message:'must be logged in'});
	}
};
//app.get('/protected', checkLogin, (req, res) => {res.json({message: "logged in"})});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', checkLogin, indexRouter);
app.use('/', uploadRouter)
app.use('/users', usersRouter);
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('login.html')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});
app.listen(3000);
module.exports = app;
