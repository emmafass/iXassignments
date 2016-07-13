var app = angular.module('iXCApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: "FeedCtrl",
		templateUrl: "/templates/feed.html"
	})
	$routeProvider.when('/me/:brusId', {
		controller: "MeCtrl",
		templateUrl: "/templates/me.html"
	})
});

app.controller("FeedCtrl", function($scope, $http) {
	//set the isSending function to false
	$scope.isSending = false;
	// GET the props
	$http({
		url: "http://ixchommies.herokuapp.com/props",
		method: "GET",
		params: {
			token: "92648ae82ceecd6d00bc757c68340326"
		}
	}).then(function(response) {
		console.log(response);
		$scope.props = response.data;
	});

	//GET the Brus
	$http({
		url: "http://ixchommies.herokuapp.com/brus",
		method: "GET",
		params: {
			token: "92648ae82ceecd6d00bc757c68340326"
		}
	}).then(function(response) {
		console.log(response);
		$scope.brus = response.data;
	});

	//POST props
	$scope.sendProps = function(x, y){
		//Set the isSending function to true
		$scope.isSending = true;
		$scope.error_message = "";
		$http({
			url: "http://ixchommies.herokuapp.com/props",
			method: "POST",
			params: {
				token: "92648ae82ceecd6d00bc757c68340326"
				
			},
			data: {
				for: x,
				props: y
			}
		//If the POST works!!!!!!!!!
		}).then(function(response) {
			//add props to your array of props ... It works instantly wow!!!
			console.log(response);
			$scope.props.unshift(response.data);
			$scope.newPropsValue = "";
			$scope.selectedBru = "";
		//If the POST gets rejected :((((
		}).catch(function(e){
			console.log(e);
			console.log(e.data.message);
			$scope.error_message = e.data.message;
			$scope.newPropsValue = "";
			
		}).finally(function(p){
			console.log(p);
			$scope.isSending = false;	
		});
	}
});

app.controller("MeCtrl", function($scope, $http) {
	$http({
		url: "http://ixchommies.herokuapp.com/props/me",
		method: "GET",
		params: {
			token: "92648ae82ceecd6d00bc757c68340326",
		}
	}).then( function(response) {
		console.log(response);
		$scope.me_props = response.data;
		$scope.me_me_me = response.data[0].receiver.first_name;
	})
});






