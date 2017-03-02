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
		res.render('home.html', {user: getUserData(req.user)});
	});

	app.get('/home.html', function(req, res) {
		if(req.user == null) {
			console.log("User not logged in");
		} else {
			console.log(" ");
			console.log("==========================================");
			console.log("currently logged in: " + req.user.displayName);
			for(var propertyName in req.user) {
				console.log("propertyName: " + propertyName);
			}
			console.log("==========================================");
			console.log(" ");
		}
		res.render('home.html', { user: getUserData(req.user)});
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		res.render('game.html', { user: getUserData(req.user)});
	});

	app.get('/loginUnsuccesful', function(req, res) {
		res.render('home.html', { user: getUserData(req.user)}); // Change to game.html if using HTML pages
	});

	app.get('/community.html', function(req, res) {
		res.render('community.html', { user: getUserData(req.user)});
	});

	app.get('/myAccount.html', function(req, res) {
		res.render('myAccount.html', { user: getUserData(req.user)});
	});

	app.get('/highscore.html', function(req, res) {
		res.render('highscore.html', { user: getUserData(req.user)});
	});

	app.get('/game.html', function(req, res) {
		res.render('game.html', { user: getUserData(req.user)});
	});

	app.get('/login.html', function(req, res) {
		res.render('login.html');
	});

	app.get('/connection.php', function(req, res){
		exec("php connection.php", function (error, stdout, stderr) {
			console.log(stdout);
		});
	});

	app.get('../css/style.css', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/css/style.css'));
	});

	app.get('../javascript/pixi.min.js', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/javascript/pixi.min.js'));
	});

	app.get('../javascript/siteScript.js', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/javascript/siteScript.js'));
	});

	app.get('../javascript/game.js', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/javascript/game.js'));
	});
	
	app.get('/favicon.ico', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/pictures/favicon.ico'));
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

function getUserData(googleUser) {
	console.log("==============================");
	var currentUser = {};

	if (typeof googleUser === "undefined" || googleUser == null) {
		console.log("User is undefined");
		currentUser["email"] = "none";
		currentUser["name"] = "none";
		currentUser["score"] = -1;
		currentUser["tries"] = -1;
		currentUser["picture"] = -1;
	} else {
		console.log("User is defined");
		currentUser["email"] = googleUser.emails[0].value;
		currentUser["name"] = googleUser.displayName;
		currentUser["score"] = 4200;
		currentUser["tries"] = 68;
		currentUser["picture"] = googleUser.photos[0].value;
	}

	console.log("END OF USER BUILD");
	console.log('return currentUser: ' + currentUser.name);
	console.log("==============================");
	return currentUser;
}