var path = require("path");
var fs = require('fs');
var engineFilePath = __dirname+'\\engine.json';

var updateJsonEngine = function(localFields) {
	fs.readFile(engineFilePath, function(err, data) {
		if (err) {
			console.log(err);
		}
		var engineJson = JSON.parse(data);
		
		var algorithms = engineJson.algorithms;
		var params;
		for (var i=0; i < algorithms.length; i++) {
			if (algorithms[i].name == 'ur') {
				params = algorithms[i].params;
				break;
			}
		}
		
		params.fields = localFields;
		
		fs.writeFile(engineFilePath, JSON.stringify(engineJson, null, 2), 'utf8', function(erro, data) {
			if (err) {
				console.log(erro);
			}
			// worked
		});
	});
};

var getBiases = function() {
	data = fs.readFileSync(engineFilePath);
	var engineJson = JSON.parse(data);
	
	var algorithms = engineJson.algorithms;
	var params;
	for (var i=0; i < algorithms.length; i++) {
		if (algorithms[i].name == 'ur') {
			params = algorithms[i].params;
			break;
		}
	}
	
	if (!params.hasOwnProperty('fields')) {
		
		params.fields = [];
		
		fs.writeFile(engineFilePath, (JSON.stringify(engineJson, null, 2)).replace(/^\s*[\r\n]/gm), 'utf8', function(err, data) {
			if (err) {
				console.log(err);
			}
			// worked
		});
		
	}
	return params.fields;
};

var printFile = function() {
	var engineFile = fs.readFileSync(engineFilePath);
	var engine = JSON.parse(engineFile);
	console.log(engine);
};

exports.updateJsonEngine = updateJsonEngine;
exports.getBiases = getBiases;
exports.printFile = printFile;


// Send a file with all the changes that need to be made to the engine.json file
// Go through products, categories, etc and look if the entry already exists. If it does, delete. Insert the data