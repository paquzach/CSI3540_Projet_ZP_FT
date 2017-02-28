var express = require('express');
var app = express();
var port = 8282;

var path = require("path");
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var sql = require("mssql");

var dbConfig = {
    server: "99.236.195.44",
    database: "Meteorz",
    user: "sa",
    password: "RAPA999!",
    port: 1433
};

//Test for access to the database

function getEmp() {
    var conn = new sql.Connection(dbConfig);
    
    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT ppicture, username, highscore FROM GameInfo").then(function (recordset) {
            console.log("This is the result from the query on the database: ", recordset);
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

getEmp();

///////////////////////////////////////////////////////////////////////////

app.use(express.static('public'));
app.use( passport.initialize());
app.use( passport.session());


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

// view engine setup
app.set('views', path.join(__dirname, 'public/html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('./app/routes.js')(app, passport, io);

server.listen(port, "0.0.0.0");

console.log('Server running on port: ' + port);