var localJsonEngine = {};

var productBiases = [];
var categoryBiases = [];
var brandBiases = [];

localJsonEngine.productBiases = productBiases;
localJsonEngine.categoryBiases = categoryBiases;
localJsonEngine.brandBiases = brandBiases;

var scope;
var biases;
var biasesLoaded = false;

angular.module('biasesController', []).controller('BiasesController', function($scope) {
	$scope.biases = this;
	
	// FUNCTIONS FOR GENERAL USE
	$scope.biases.saveChanges = function() {
		
		var fields = [];
		
		for (var i=0; i < $scope.biases.productList.length; i++) {
			var newProductJson = {
				"name": "items",
				"values": [$scope.biases.productList[i].code],
				"bias": $scope.biases.productList[i].boost
			};
			fields.push(newProductJson);
		}
		
		for (var i=0; i < $scope.biases.categoryList.length; i++) {
			var newCategoryJson = {
				"name": "categories",
				"values": [$scope.biases.categoryList[i].code],
				"bias": $scope.biases.categoryList[i].boost
			};
			fields.push(newCategoryJson);
		}
		
		for (var i=0; i < $scope.biases.brandList.length; i++) {
			var newBrandJson = {
				"name": "brands",
				"values": [$scope.biases.brandList[i].code],
				"bias": $scope.biases.brandList[i].boost
			};
			fields.push(newBrandJson);
		}
		
		server.emit('saveChanges', fields);
	};
	
	
	// FUNCTIONS FOR SETUP
	$scope.biases.applyBiases = function(biasesJson) {
		if (typeof biasesJson != 'undefined') {
			
			for (var i=0; i < biasesJson.length; i++) {
				var name = biasesJson[i].name;
				var code = biasesJson[i].values[0];
				var boost = biasesJson[i].bias;
				
				var newBias = {
					code: code,
					boost: boost
				}
				
				if (name.toLowerCase() === "items") {
					$scope.biases.productList.push(newBias);
				} else if (name.toLowerCase() === "categories") {
					$scope.biases.categoryList.push(newBias);
				} else if (name.toLowerCase() === "brands") {
					$scope.biases.brandList.push(newBias);
				} else {
					console.log("No valid type of " + name);
				}
			};
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
	
	$scope.biases.addProductLine = function() {
		var duplicate = false;
		var productCode = prompt("Please enter the product code");
		
		if (productCode.replace(/\s/g,'') !== "") {
			for (var i=0; i < $scope.biases.productList.length; i++) {
				if (productCode.toLowerCase() === $scope.biases.productList[i].code.toLowerCase()) {
					duplicate = true;
					break;
				}
			}
			if (!duplicate) {
				var newProductBias = {
					code: productCode,
					boost: 0.0
				};
				$scope.biases.productList.push(newProductBias);
			} else {
				var warningMessage = "The product " + productCode + " already has a bias."
				alert(warningMessage);
			}
		} else if (productCode === null) {
			// Nothing, cancel was pressed
		} else {
			alert("You need to enter a value");
		}
	};
	
	$scope.biases.removeProductLine = function(product) {
		for (var i=0; i < $scope.biases.productList.length; i++) {
			if (product.code.toLowerCase() === $scope.biases.productList[i].code.toLowerCase()) {
				$scope.biases.productList.splice(i,1);
				break;
			}
		}
	};
	
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
		if (product.boost == undefined) {
			//console.log("boost is undefined");
		} else if (product.boost > 1) {
			product.boost = 1;
			//$scope.biases.updateJsonForProduct(product);
		} else if (product.boost < -1) {
			product.boost = -1;
			//$scope.biases.updateJsonForProduct(product);
		} else {
			//$scope.biases.updateJsonForProduct(product);
		}
	};
	
	
	// FUNCTIONS FOR CATEGORY BIASES
	$scope.biases.categoryList = [];
	
	$scope.biases.addCategoryLine = function() {
		var duplicate = false;
		var categoryCode = prompt("Please enter the category code");
		
		if (categoryCode !== null && categoryCode.replace(/\s/g,'') !== "") {
			for (var i=0; i < $scope.biases.categoryList.length; i++) {
				if (categoryCode.toLowerCase() === $scope.biases.categoryList[i].code.toLowerCase()) {
					duplicate = true;
					break;
				}
			}
			if (!duplicate) {
				var newCategoryBias = {
					code: categoryCode,
					boost: 0.0
				};
				$scope.biases.categoryList.push(newCategoryBias);
			} else {
				var warningMessage = "The category " + categoryCode + " already has a bias."
				alert(warningMessage);
			}
		} else if (categoryCode === null) {
			// Nothing, cancel was pressed
		} else {
			alert("You need to enter a value");
		}
	};
	
	$scope.biases.removeCategoryLine = function(category) {
		for (var i=0; i < $scope.biases.categoryList.length; i++) {
			if (category.code.toLowerCase() === $scope.biases.categoryList[i].code.toLowerCase()) {
				$scope.biases.categoryList.splice(i,1);
				break;
			}
		}
	};
	
	$scope.biases.validateCategoryValues = function(category) {
		if (category.boost == undefined) {
			//console.log("boost is undefined");
		} else if (category.boost > 1) {
			category.boost = 1;
			//$scope.biases.updateJsonForCategory(category);
		} else if (category.boost < -1) {
			category.boost = -1;
			//$scope.biases.updateJsonForCategory(category);
		} else {
			//$scope.biases.updateJsonForCategory(category);
		}
	};
	
	
	// FUNCTIONS FOR BRAND BIASES
	$scope.biases.brandList = [];
	
	$scope.biases.addBrandLine = function() {
		var duplicate = false;
		var brandCode = prompt("Please enter the brand code");
		
		if (brandCode !== null || brandCode.replace(/\s/g,'') !== "") {
			for (var i=0; i < $scope.biases.brandList.length; i++) {
				if (brandCode.toLowerCase() === $scope.biases.brandList[i].code.toLowerCase()) {
					duplicate = true;
					break;
				}
			}
			if (!duplicate) {
				var newBrandBias = {
					code: brandCode,
					boost: 0.0
				};
				$scope.biases.brandList.push(newBrandBias);
			} else {
				var warningMessage = "The brand " + brandCode + " already has a bias."
				alert(warningMessage);
			}
		} else if (brandCode === null) {
			// Nothing, cancel was pressed
		} else {
			alert("You need to enter a value");
		}
	};
	
	$scope.biases.removeBrandLine = function(brand) {
		for (var i=0; i < $scope.biases.brandList.length; i++) {
			if (brand.code.toLowerCase() === $scope.biases.brandList[i].code.toLowerCase()) {
				$scope.biases.brandList.splice(i,1);
				break;
			}
		}
	};
	
	$scope.biases.validateBrandValues = function(brand) {
		if (brand.boost == undefined) {
			//console.log("boost is undefined");
		} else if (brand.boost > 1) {
			brand.boost = 1;
			//$scope.biases.updateJsonForBrand(brand);
		} else if (brand.boost < -1) {
			brand.boost = -1;
			//$scope.biases.updateJsonForBrand(brand);
		} else {
			//$scope.biases.updateJsonForBrand(brand);
		}
	};
	
	
	// LOADING PRODUCT, CATEGORY & BRAND BIASES
	server.emit('loadBiases');
	
	server.on('loadingBiases', function(biasesJson){
		if (!biasesLoaded) {
			$scope.biases.applyBiases(biasesJson);
			$scope.$apply();
			biasesLoaded = true;
		}
	});
});