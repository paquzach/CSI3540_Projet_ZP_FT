var User = require('./models/user');
var path = require("path");
var jsonFileController = require(__dirname+'/../private/javascripts/jsonFileController');

module.exports = function(app, passport, io){
	app.get('/', function(req, res){
		res.render('index.ejs');
	});

	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/biascockpit',
	                                      failureRedirect: '/' }));

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	
	app.get('/biascockpit', isLoggedIn, function(req, res) {
		res.render('biascockpit.ejs', { user: req.user});
	});
	
	app.get('/javascripts/biasesController.js', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/javascripts/biasesController.js'));
	});
	
	app.get('/stylesheets/biasesStyle.css', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/stylesheets/biasesStyle.css'));
	});
	
	io.on('connection', function(client) {
		
		client.on('loadBiases', function() {
			io.sockets.emit('loadingBiases', jsonFileController.getBiases());
		});
		
		client.on('saveChanges', function(localJsonEngine) {
			jsonFileController.updateJsonEngine(localJsonEngine);
		});
	});
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/');
}