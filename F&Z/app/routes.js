var User = require('./models/user');
var path = require("path");

module.exports = function(app, passport, io){


	// Google
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
    	passport.authenticate('google', { successRedirect: '/loginSuccesful',
                                        failureRedirect: '/loginUnsuccesful' }));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/loginUnsuccesful');
	});

	//
	
	app.get('/', function(req, res) {
		res.render('home.html');
	});

	app.get('/home.html', function(req, res) {
		res.render('home.html');
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		res.render('game.html', { user: req.user});
	});

	app.get('/community.html', function(req, res) {
		res.render('community.html');
	});

	app.get('/myAccount.html', function(req, res) {
		res.render('myAccount.html');
	});

	app.get('/highscore.html', function(req, res) {
		res.render('highscore.html');
	});

	app.get('/game.html', function(req, res) {
		res.render('game.html');
	});

	app.get('/login.html', function(req, res) {
		res.render('login.html');
	});

	app.get('../style.css', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/css/style.css'));
	});
	
	
	app.get('/favicon.ico', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/html/favicon.ico'));
	});

	io.on('connection', function(client) {
		
	});

};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}