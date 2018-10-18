const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user)
	});

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENTID,
		clientSecret: process.env.GOOGLE_CLIENTSECRET,
		callbackURL: process.env.HEROKU ? 'https://lowell-scheduler.herokuapp.com/auth/google/callback' : "http://localhost:4000/auth/google/callback"
	}, 
	(token, refreshToken, profile,done ) => {
		return done(null, {
			profile: profile,
			token: token
		})
	}
	));
}