var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../app/models/user.js');
var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		console.log("Creating a new user");
	    		var newUser = new User();
	    		newUser.google.id = profile.id;
	    		newUser.google.token = accessToken;
	    		newUser.google.name = profile.displayName;
	    		newUser.google.email = profile.emails[0].value;
	    		return done(null, profile);
	    	});
	    }

	));
};