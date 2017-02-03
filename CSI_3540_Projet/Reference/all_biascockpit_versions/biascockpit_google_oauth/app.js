var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');


var configDB = require('./config/database.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.set('view engine', 'ejs');
require('./app/routes.js')(app, passport, io);

server.listen(port, "0.0.0.0");

console.log('Server running on port: ' + port);

// OLD VERSION
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