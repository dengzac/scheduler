const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user)
	});

	passport.use(new GoogleStrategy({
		clientID: '826730322175-vp9rkjhimsqepeg0j7gkdvjd5722lecg.apps.googleusercontent.com',
		clientSecret: 'oNr7dP8ocQacVLWLWhUB0oT5',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	}, 
	(token, refreshToken, profile,done ) => {
		return done(null, {
			profile: profile,
			token: token
		})
	}
	));
}