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
		res.render('home.php');
	});

	app.get('/home.html', function(req, res) {
		res.render('home.html');
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		res.render('game.php', { user: req.user}); // Change to game.html if using HTML pages
	});

	app.get('/loginUnsuccesful', isLoggedIn, function(req, res) {
		res.render('home.php'); // Change to game.html if using HTML pages
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

	app.get('/home.php', function(req, res) {
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
		res.render('home.php');
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		res.render('game.php', { user: req.user});
	});

	app.get('/test.php', function(req, res) {
		res.render('test.php');
	});

	app.get('/community.php', function(req, res) {
		res.render('community.php');
	});

	app.get('/myAccount.php', function(req, res) {
		getUserData(function(currentUser) {
			res.render('myAccount.php', { user: currentUser});
		});
	});

	app.get('/highscore.php', function(req, res) {
		res.render('highscore.php');
	});

	app.get('/game.php', function(req, res) {
		res.render('game.php');
	});

	app.get('/login.php', function(req, res) {
		res.render('login.php');
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
	
	app.get('/favicon.ico', function(req, res) {
		res.sendFile(path.join(__dirname+'/../public/php/favicon.ico'));
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

function getUserData(callback) {
	var currentUser = {};
	var userEmail = "";
	var userName = "";
	var userScore = 0;
	var userTries = 0;
	var exec = require("child_process").exec;
	exec("php public/php/connection.php", function (error, stdout, stderr) {
		console.log(stdout);
		var lines = stdout.split(/\r\n|\r|\n/);
		console.log("lines: " + lines);
		console.log("lines.length: " + lines.length);
		for(var i = 0;i < lines.length;i++){
		    if (i==0) {
		    	userEmail = lines[i].trim();
		    } else if (i==1) {
		    	userName = lines[i].trim();
		    } else if (i==2) {
		    	userScore = lines[i];
		    } else if (i==3) {
		    	userTries = lines[i];
		    }
		}

		currentUser["email"] = userEmail;
		currentUser["name"] = userName;
		currentUser["score"] = userScore;
		currentUser["tries"] = userTries;

		console.log('return currentUser: ' + currentUser.name);
		callback(currentUser);
	});
}