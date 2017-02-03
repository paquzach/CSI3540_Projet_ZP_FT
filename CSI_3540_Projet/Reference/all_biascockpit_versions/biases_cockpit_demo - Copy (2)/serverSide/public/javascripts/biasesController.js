var localJsonEngine = {};

var productBiases = [];
var categoryBiases = [];
var brandBiases = [];

localJsonEngine.productBiases = productBiases;
localJsonEngine.categoryBiases = categoryBiases;
localJsonEngine.brandBiases = brandBiases;

var scope;
var biases;

angular.module('biasesController', []).controller('BiasesController', function($scope) {
	$scope.biases = this;
	scopeBiase = $scope.biases;
	
	// FUNCTIONS FOR GENERAL USE
	$scope.biases.saveChanges = function() {
		server.emit('saveChanges', localJsonEngine);
	};
	
	
	// FUNCTIONS FOR SETUP
	$scope.biases.applyBiases = function(biasesJson) {
		if (typeof biasesJson != 'undefined') {
			localJsonEngine.productBiases = biasesJson.productBiases;
			localJsonEngine.categoryBiases  = biasesJson.categoryBiases;
			localJsonEngine.brandBiases  = biasesJson.brandBiases;
			
			for (var i=0; i < biasesJson.productBiases.length; i++) {
				var productCode;
				var productBoostValue;
				for (ii in biasesJson.productBiases[i]) {
					productCode = ii;
					productBoostValue = (biasesJson.productBiases[i])[ii];
				}
				
				for (var r=0; r < $scope.biases.productList.length; r++) {
					if ($scope.biases.productList[r].code == productCode) {
						var productWithBiase = $scope.biases.productList[r];
						productWithBiase.boost = true;
						productWithBiase.boostValue = productBoostValue;
					}
				}
			};
			
			console.log(JSON.stringify(localJsonEngine));
		}
	};
	
	$scope.biases.getProductList = function() {
		return $scope.biases.getSampleProducts();
	};

	
	$scope.biases.getCategoryList = function() {
		
	};
	
	$scope.biases.getBrandList = function() {
		
	};
	
	
	// DUMMY FUNCTIONS FOR TESTING
	$scope.biases.getSampleProducts = function() {
		return [
			{code:'product_01', boost:false, boostValue:0.0},
			{code:'product_02', boost:false, boostValue:0.0},
			{code:'product_03', boost:false, boostValue:0.0},
			{code:'product_04', boost:false, boostValue:0.0},
			{code:'product_05', boost:false, boostValue:0.0}
		];
	};
	
	$scope.biases.getSampleCategories = function() {
		
	};
	
	$scope.biases.getSampleBrands = function() {
		
	};
	
	
	// FUNCTIONS FOR PRODUCT BIASES
	$scope.biases.productList = [];
	
	$scope.biases.updateJsonForProduct = function(product) {
		var hasMatch = false;
		
		for (var i=0; i < localJsonEngine.productBiases.length; i++) {
			for (var ii in localJsonEngine.productBiases[i]) {
				if (ii == product.code) {
					console.log(ii);
					localJsonEngine.productBiases.splice(i,1);
					hasMatch = true;
					break;
				}
			}
			if (hasMatch) {
				break;
			}
		}
		
		if (product.boost) {
			var productBias = {};
			productBias[product.code] = product.boostValue;
			localJsonEngine.productBiases.push(productBias);
		}
		
		console.log(JSON.stringify(localJsonEngine));
	};
	
	$scope.biases.validateProductValues = function(product) {
		if (product.boostValue == undefined) {
			//console.log("boostValue is undefined");
		} else if (product.boostValue > 1) {
			product.boostValue = 1;
			$scope.biases.updateJsonForProduct(product);
		} else if (product.boostValue < -1) {
			product.boostValue = -1;
			$scope.biases.updateJsonForProduct(product);
		} else {
			$scope.biases.updateJsonForProduct(product);
		}
	};
	
	
	// FUNCTIONS FOR CATEGORY BIASES
	$scope.biases.categoryList = [];
	
	
	// FUNCTIONS FOR BRAND BIASES
	$scope.biases.brandList = [];
	
	
	// LOADING PRODUCT, CATEGORY, BRANDS AND BIASES
	server.on('loadingProducts', function() {
		$scope.biases.productList = $scope.biases.getProductList();
		server.emit('loadBiases');
	});
	server.on('loadingBiases', function(biasesJson){
		$scope.biases.applyBiases(biasesJson);
		$scope.$apply();
	});
	server.emit('loadProducts', "");
});