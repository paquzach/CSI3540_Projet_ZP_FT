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
	
	//client.emit('connected', 'Connected to node.js server');
	//client.emit('loadProducts');
	//client.emit('loadCategories');
	//client.emit('loadBrands');
	
	client.on('loadProducts', function(str) {
		io.sockets.emit('loadingProducts');
	});

	client.on('loadBiases', function() {
		io.sockets.emit('loadingBiases', jsonFileController.getBiases());
	});
	
	client.on('productChanged', function(product) {
		console.log("Update the product " + product.code + " with boost: " + product.boost + " and with value: " + product.boostValue);
		client.emit('jsonUpdated', 'The Json file was updated on the server..');
	});
	
	client.on('saveChanges', function(localJsonEngine) {
		console.log(JSON.stringify(localJsonEngine));
		jsonFileController.updateJsonEngine(localJsonEngine);
	});
});

server.listen(8080);