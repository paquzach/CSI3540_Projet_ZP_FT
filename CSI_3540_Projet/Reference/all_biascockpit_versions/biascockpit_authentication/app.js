var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
		clientID: "544059926791-kohrdgst0f9aa4sgq25r9qp4je5klais.apps.googleusercontent.com",
		clientSecret: "V2II0L6OGe3DQWNemWkE1WId",
		callbackURL: "http://localhost:8080/oauth2callback"
	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			return done(null, profile);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {  
    db.findUserById(id, function(err, user) {
        done(err, user);
    });
});


app.get('/auth/google/', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){} // this never gets called
);

app.get('/oauth2callback', passport.authenticate('google',  
    { successRedirect: '/biasescockpit', failureRedirect: '/login' }
));

app.get('/api',  
    ensureAuthenticated,
    function(req, res) {
        res.json({ message: 'Hooray! welcome to our api!' });
    }
); 

  
app.get('/biasescockpit', function(req, res) {
	if (ensureAuthenticated(req, res, true)) {
		res.sendFile(path.join(__dirname+'/index.html'));
	} else {
		res.redirect('/auth/google/');
	}
});
	

server.listen(8080, "0.0.0.0");

//

function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated()) { 
		return next; 
	}
    res.sendStatus(401);
}
//#########################################################################################################

//var express = require('express');
//var app = express();
//var server = require('http').createServer(app);
//var io = require('socket.io')(server);
//var path = require("path");

//var jsonFileController = require('./jsonFileController');

//app.use(express.static('public'));

//app.get('/biasescockpit', function(req, res) {
	//res.sendFile(path.join(__dirname+'/index.html'));
//});

//io.on('connection', function(client) {
	//console.log("Client connected...");
	
	//client.on('loadBiases', function() {
		//io.sockets.emit('loadingBiases', jsonFileController.getBiases());
	//});
	
	//client.on('saveChanges', function(localJsonEngine) {
		//jsonFileController.updateJsonEngine(localJsonEngine);
	//});
//});

//server.listen(8080, "0.0.0.0");