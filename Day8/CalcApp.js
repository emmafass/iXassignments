var app = angular.module('CalculatorApp', []);

app.controller('CalculatorCtrl', function($scope) {
	$scope.doAdd = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		var numZ = parseInt($scope.z);
		$scope.result1 = numX + numY + numZ;
	};
	$scope.doSubtract = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		var numZ = parseInt($scope.z);
		$scope.result2 = numX - numY - numZ;
	};
	$scope.doMultiply = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		var numZ = parseInt($scope.z);
		$scope.result3 = numX * numY * numZ;
	};
	$scope.doDivide = function() {
		var numX = parseInt($scope.x);
		var numY = parseInt($scope.y);
		var numZ = parseInt($scope.z);
		$scope.result4 = numX / numY / numZ;
	};
});