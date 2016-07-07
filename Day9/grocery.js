var app = angular.module('theGroceryList', []);

app.controller('groceryCtrl', function($scope) {
	$scope.groceries = [];

	$scope.addItem = function() {
		var isIncluded = false;
		for(var i = 0 ; i < $scope.groceries.length; i++) {
			if ($scope.groceries[i].name === $scope.item.toLowerCase()) {
				$scope.groceries[i].amt += parseInt($scope.amount);
				isIncluded = true;
			}
		}
		if (isIncluded === false){
			if (isNaN($scope.item) === false){
				console.log("Added a number");
				$scope.item = "";
				$scope.amount = "";
				return;
			}
			if (isNaN($scope.amount) === true){
				console.log("Added a number");
				$scope.item = "";
				$scope.amount = "";
				return;
			}
			var newItem = {
				name: $scope.item.toLowerCase(),
				amt: parseInt($scope.amount),
				"isEditing": false
			};
			$scope.groceries.push(newItem);
		}
		$scope.item = "";
		$scope.amount = "";
	};

	$scope.add = function(item) {
		item.amt += 1;
	};

	$scope.subtract = function(item) {
		if(item.amt != 0) {
			item.amt -= 1;
		}
		else {
			$scope.item.delete();
		}
	};

	$scope.delete = function(i) {
		$scope.groceries.splice(i,1);
	};

	$scope.empty = function() {
		// for(var i = 0; i <$scope.groceries.length; i++) {
			$scope.groceries = [];
		// }
	};

});

