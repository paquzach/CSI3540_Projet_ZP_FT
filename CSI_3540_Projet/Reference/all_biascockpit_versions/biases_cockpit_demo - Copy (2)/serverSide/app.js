var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require("path");

var jsonFileController = require('./jsonFileController');

app.use(express.static('public'));

app.get('/biasescockpit', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

io.on('connection', function(client) {
	console.log("Client connected...");
	

	//client.on('loadCategories', function() {});
	//client.on('loadBrands', function() {});
	
	client.on('loadProducts', function(str) {
		io.sockets.emit('loadingProducts');
	});

	client.on('loadBiases', function() {
		io.sockets.emit('loadingBiases', jsonFileController.getBiases());
	});
	
	client.on('saveChanges', function(localJsonEngine) {
		console.log(JSON.stringify(localJsonEngine));
		jsonFileController.updateJsonEngine(localJsonEngine);
	});
});

server.listen(8080);