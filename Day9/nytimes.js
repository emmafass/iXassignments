var app = angular.module('nyt', []);
var NY_TIMES_API_KEY ='57a5f6a085534488825b196d3f56acbf';

app.controller('MainCtrl', function($scope, $http) {
	$scope.search = function() {
		console.log("got to search function");
		$http({
			url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
			method: "GET",
			params: {
				'api-key': NY_TIMES_API_KEY,
				'q': $scope.searchTerm
			}
		}).then(function(response) {
			console.log(response.data.response.docs);
			$scope.articles = response.data.response.docs;
		}); 
	};
});