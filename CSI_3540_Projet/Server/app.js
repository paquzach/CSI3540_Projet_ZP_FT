var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require("path");
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname+'/public/html/home.html'));
});

app.get('/*', function(req,res) {
	res.setHeader('Content-type', 'text/html');
	res.sendFile(path.join(__dirname+'/public/html' + req.url));
});

io.on('connection', function(client) {
	
});

server.listen(8282, "0.0.0.0");