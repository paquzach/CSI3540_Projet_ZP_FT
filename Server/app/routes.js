var path = require("path");
var nextPath = "game.html"; 
var loggedIn = false;
var currentUser = {};

currentUser["email"] = "none";
currentUser["name"] = "none";
currentUser["score"] = -1;
currentUser["tries"] = -1;
currentUser["picture"] = -1;

var sql = require("mssql");

var dbConfig = {
    server: "99.236.195.44",
    database: "Meteorz",
    user: "sa",
    password: "RAPA999!",
    port: 8585,
    connectionTimeout: 1000
};



module.exports = function(app, passport, io){


	// Google
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
    	passport.authenticate('google', { successRedirect: '/loginSuccesful',
                                        failureRedirect: '/logoutSuccesful' }));

	app.get('/logout', function(req, res){
		req.logout(); 
		nextPath = "game.html"; 
		loggedIn = false;
		res.redirect('/logoutSuccesful');
	});

	//
	
	app.get('/', function(req, res) {
		userData(req.user);
		res.render('home.html', {user: getUser()});
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
		res.render('home.html', { user: getUser()});
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		loggedIn = true;
		userData(req.user);
		res.render(nextPath, { user: getUser()});
	});

	app.get('/logoutSuccesful', function(req, res) {
		userData(req.user);
		res.render('home.html', { user: getUser()}); // Change to game.html if using HTML pages
	});

	app.get('/community.html', function(req, res) {
		res.render('community.html', { user: getUser()});
	});

	app.get('/myAccount.html', function(req, res) {
		nextPath = "myAccount.html";
		userData(req.user);
		if (loggedIn){
			res.render('myAccount.html', { user: getUser()});
		}
		else{
			res.render('login.html', { problem: "account"});
		}
	});

	app.get('/highscore.html', function(req, res) {
		userData(req.user);
		res.render('highscore.html', { user: getUser()});
	});

	app.get('/game.html', function(req, res) {
		nextPath = "game.html";
		userData(req.user);
		if (loggedIn){
			res.render('game.html', { user: getUser()});
		}
		else{
			res.render('login.html', { problem: "game"});
		}
	});

	app.get('/login.html', function(req, res) {
		if(loggedIn){
			res.render('home.html', { user: getUser()});
		}
		else{
			res.render('login.html', { problem: "none"});
		}
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

function userData(googleUser) {
    var conn = new sql.Connection(dbConfig);
    var results = "";

	console.log("==============================");

	if (googleUser == null) {
		console.log("User is undefined");
		setUser(null);
	} else {
		console.log("User is defined");

		conn.connect().then(function () {
	        var req = new sql.Request(conn);
	        req.input('userEmail', googleUser.emails[0].value);
	        req.input('userName',  googleUser.displayName.split(" ", 1)[0]);
	        //Check if the user is created, if not create him
	        req.query`IF NOT EXISTS (SELECT * FROM GameInfo WHERE email = @userEmail)
				BEGIN
					INSERT INTO GameInfo
					VALUES (@userEmail, @userName, null, 0, 0, 0);
				END`.then(function () {
	            conn.close();
	        })
	        .catch(function (err) {
	            console.log(err);
	            conn.close();
	        });  
	        //Select user from database and assign his info to user variable 
	       	var req2 = new sql.Request(conn);
	        req2.input('userEmail', googleUser.emails[0].value);
	        req2.query`SELECT email, username, highscore, attemps FROM GameInfo WHERE email = @userEmail;`.then(function (recordset) 
	        {
	        	console.log("Were in the query script and this is recordset: \n", recordset);
				setUser(recordset);
	            conn.close();
	        })
	        .catch(function (err) {
	            console.log(err);
	            conn.close();
	        });      
	    })
	    .catch(function (err) {
	        console.log(err);
		});
	}
	console.log("END OF USER BUILD");
	console.log('return currentUser: ' + currentUser.name);
	console.log("==============================");

}

function setUser(details)
{
	console.log("Were in setUser and this is details: \n", details);
	if(details != null){
		var d = details[0];
		currentUser["email"] = d.email.trim();
		currentUser["name"] = "" + d.username.trim();
		currentUser["score"] = d.highscore;
		currentUser["tries"] = d.attemps;
		console.log("All the things assigned here: ", currentUser["email"], currentUser["name"], currentUser["score"], currentUser["tries"]);
		currentUser["picture"] = -1;
	}
	else{
		currentUser["email"] = "none";
		currentUser["name"] = "none";
		currentUser["score"] = -1;
		currentUser["tries"] = -1;
		currentUser["picture"] = -1;
	}
}

function getUser(){
	return currentUser;
}
