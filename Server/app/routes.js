var path = require("path");
var bodyParser = require('body-parser');

var nextPath = "game.html"; 

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
	// parse application/x-www-form-urlencoded 
	app.use(bodyParser.urlencoded({ extended: true}))
 
	// parse application/json 
	app.use(bodyParser.json())

	// Google
	app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

	app.get('/auth/google/callback', 
    	passport.authenticate('google', { successRedirect: '/loginSuccesful',
                                        failureRedirect: '/logoutSuccesful' }));

	app.get('/logout', function(req, res){
		req.logout(); 
		nextPath = "game.html"; 
		res.redirect('/logoutSuccesful');
	});

	//
	
	app.get('/', function(req, res) {
		userData(req.user, function(userToSend) {
			res.render('home.html', {user: userToSend});
		});
	});

	app.get('/home.html', function(req, res) {
		/*
		if(!req.isAuthenticated()) {
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
		*/
		userData(req.user, function(userToSend) {
			res.render('home.html', { user: userToSend});
		});
	});
	
	app.get('/loginSuccesful', isLoggedIn, function(req, res) {
		res.redirect(nextPath);
	});

	app.get('/logoutSuccesful', function(req, res) {
		userData(req.user, function(userToSend) {
			res.redirect('/home.html'); // Change to game.html if using HTML pages
		});
	});

	app.get('/community.html', function(req, res) {
		userData(req.user, function(userToSend) {
			res.render('community.html', { user: userToSend});
		});
	});

	app.get('/myAccount.html', function(req, res) {
		nextPath = "myAccount.html";

		if (req.isAuthenticated()) {
			userData(req.user, function(userToSend) {
				res.render('myAccount.html', { user: userToSend});
			});
		} else {
			res.render('login.html', { problem: "account"});
		}
	});

	app.post('/myAccount.html', function(req, res){
    	console.log("Somehow this is working ", req.body.userName);
    	if (req.body.userName != undefined){
			var newUserName = req.body.userName;
			updateUserName(newUserName, req.user, function(){
				//do nothing
			});

			/* This code is for when we want to update the highscore of a user
			var newHighscore = req.param('userScore');
			updateHighscore(0, req.user, function(){
				//do nothing	
			});
			*/
		}
		else{
			//do nothing
		}
		userData(req.user, function(userToSend) {
			res.render('myAccount.html', { user: userToSend});
		});
	});


	app.get('/highscore.html', function(req, res) {
		fetchRecords(function(allRows){
			userData(req.user, function(userToSend) {
				res.render('highscore.html', { user: userToSend, rows: allRows});
			});
		});


		
	});

	app.get('/game.html', function(req, res) {
		nextPath = "game.html";
		if (req.isAuthenticated()) {
			userData(req.user, function(userToSend) {
				res.render('game.html', { user: userToSend});
			});
		} else {
			res.render('login.html', { problem: "game"});
		}
	});

	app.get('/login.html', function(req, res) {
		if (req.isAuthenticated()) {
			userData(req.user, function(userToSend) {
				res.render('home.html', { user: userToSend});
			});
		} else {
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

function userData(googleUser, callback) {
    var results = "";
    var conn = new sql.Connection(dbConfig);

    var currentUser = {};
	currentUser["email"] = "none";
	currentUser["name"] = "none";
	currentUser["score"] = -1;
	currentUser["tries"] = -1;
	currentUser["picture"] = "../pictures/logo.png";

	console.log("==============================");

	if (googleUser == null) {
		console.log("User is undefined");
		callback(currentUser);
	} else {
		console.log("User is defined");
		currentUser["email"] = "metagame@mail.ca";
		currentUser["name"] = "Rockman";
		currentUser["score"] = 100101;
		currentUser["tries"] = 4;

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
	            conn.close();

	            // populate user
				var d = recordset[0];
				currentUser["email"] = d.email.trim();
				currentUser["name"] = "" + d.username.trim();
				currentUser["score"] = d.highscore;
				currentUser["tries"] = d.attemps;
				console.log("All the things assigned here: ", currentUser["email"], currentUser["name"], currentUser["score"], currentUser["tries"]);
				currentUser["picture"] = -1;

	            callback(currentUser);
	        })
	        .catch(function (err) {
	            console.log(err);
	            conn.close();
	            callback(currentUser);
	        });      
	    })
	    .catch(function (err) {
	        console.log(err);
	        callback(currentUser);
		});
	}
	console.log("END OF USER BUILD");
	console.log('return currentUser: ' + currentUser.name);
	console.log("==============================");

}

function updateUserName(newName, googleUser, callback){
	var conn = new sql.Connection(dbConfig);
	
	console.log("Entered update user name with: ", newName, ", ", googleUser.emails[0].value);

	conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.input('userEmail', googleUser.emails[0].value);
        req.input('userName', newName);
        //Check if the user is created, if not create him
        req.query`UPDATE GameInfo
			SET username= @userName
			WHERE email = @userEmail;`.then(function () {
            conn.close();
            callback();
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
            callback();
        });       
    })
    .catch(function (err) {
        console.log(err);
        callback();
	});
}

function updateHighscore(newScore, googleUser, callback){
	var conn = new sql.Connection(dbConfig);
	
	console.log("Entered update highscore with: ", newScore, ", ", googleUser.emails[0].value);

	conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.input('userEmail', googleUser.emails[0].value);
        req.input('userScore', newScore);
        //Check if the user is created, if not create him
        req.query`UPDATE GameInfo 
   				SET highscore = CASE WHEN @userScore > highscore 
                   THEN @userScore
                   ELSE highscore 
                END
 				WHERE email = @userEmail;`.then(function () {
            conn.close();
            callback();
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
            callback();
        });       
    })
    .catch(function (err) {
        console.log(err);
        callback();
	});
}

function fetchRecords(callback){
	var conn = new sql.Connection(dbConfig);
	
	console.log("Fetching all records from the table");

	conn.connect().then(function () {
        var req = new sql.Request(conn);
        //Check if the user is created, if not create him
        req.query`SELECT username, highscore FROM GameInfo ORDER BY highscore DESC;`.then(function (recordset) {
            conn.close();
            callback(recordset);
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
            callback(recordset);
        });       
    })
    .catch(function (err) {
        console.log(err);
        callback(recordset);
	});
}