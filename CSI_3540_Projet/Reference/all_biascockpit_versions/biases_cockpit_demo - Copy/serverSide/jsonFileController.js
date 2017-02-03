var path = require("path");
var fs = require('fs');
var engineFilePath = __dirname+'\\engine.json';

var stringToJson = function(str) {
	return JSON.parse(str);
};

var updateJsonEngine = function(localJsonEngine) {
	fs.readFile(engineFilePath, function(err, data) {
		if (err) {
			console.log(err);
		}
		var engineJson = JSON.parse(data);
		/*
		var newBiasesJson = {
								"productBiases": [],
								"categoryBiases": [],
								"brandBiases": []
							};
							
		for (var i=0; i < localJsonEngine.productBiasesList.length; i++) {
			var productCode = localJsonEngine.productBiasesList[i].code;
			var productBoostValue = localJsonEngine.productBiasesList[i].boostValue;
			newBiasesJson.productBiases["" + productCode] = productBoostValue;
		}
						*/		
		
		engineJson.biases = localJsonEngine;
		
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
	
	if (engineJson.hasOwnProperty('biases')) {
		return engineJson.biases;	
	} else {
		engineJson.biases = {
								"productBiases": [],
								"categoryBiases": [],
								"brandBiases": []
							};
								
		fs.writeFile(engineFilePath, JSON.stringify(engineJson, null, 2), 'utf8', function(err, data) {
			if (err) {
				console.log(err);
			}
			// worked
		});
		
		return getBiases();
	}
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