var app = angular.module('movieApp',['ngRoute']);
var omdb = "http://www.omdbapi.com/?";


app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'templates/home.html',
	})
	$routeProvider.when('/movie/:movieId', {
		controller: 'MovieCtrl',
		templateUrl: 'templates/movie.html',
	})

});

app.controller('MainCtrl', function($scope, $http) {
	$scope.searchMovie = function() {
		$http({
			url: omdb,
			method: "GET",
			params: {
				s: $scope.searchText,
			}
		}).then(function(response) {
			console.log(response);
			$scope.movieArray = response.data.Search;
		})
	}
});

app.controller('MovieCtrl', function($scope, $http, $routeParams) {
	$http({
		url: "http://www.omdbapi.com/?i="+ $routeParams.movieId +"&plot=short&r=json",
		method: "GET"
	}).then(function(response) {
		console.log(response);
		$scope.movie = response.data;

		$http({
			url: "http://api.giphy.com/v1/gifs/search",
			method: "GET",
			params: {
				q: $scope.movie.Plot,
				api_key: "dc6zaTOxFJmzC" 
			}
		}).then(function(response) {
			// console.log(response);
			$scope.gify = response.data.data;
			// console.log("response");
			// $scope.g = response.data.data;
		})

	})
});