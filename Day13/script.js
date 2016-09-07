var app = angular.module('tensionApp',['firebase','ngRoute']);


app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
    	$location.path("/signup");
    }
});
}]);



app.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: "listCtrl",
		templateUrl: "/templates/list.html",
		resolve: {
			//can inject service into the function ... name matters ... order does not
			//returns a promise... you can use .then ... the code takes some time to execute
			//the promise that it gives is Requires Sign In... firebase must provide authentication
			"currentAuth": function($firebaseAuth) {
				return $firebaseAuth().$requireSignIn();
			}
		}
	})
	$routeProvider.when('/channel/:channelId', {
		controller: "homeCtrl",
		templateUrl: "/templates/home.html",
		resolve: {
			"currentAuth": function($firebaseAuth) { //Current auth can be used in the associated controller
				return $firebaseAuth().$requireSignIn();
			}
		}
	})
	$routeProvider.when('/signup', {
		controller: "signupCtrl",
		templateUrl: "/templates/signup.html"
	})
	$routeProvider.when('/login', {
		controller: "loginCtrl",
		templateUrl: "/templates/login.html"
	})
	
});



app.controller("listCtrl", function($http, $scope, $firebaseObject, $firebaseArray, $routeParams, $firebaseAuth) {
	var ref = firebase.database().ref().child('channels');
	$scope.channels = $firebaseObject(ref);
	$scope.channelId = $routeParams.channelId;
	$scope.authObj = $firebaseAuth();


	// var submitButton = document.getElementById("submit_form");
	// var form = document.getElementById("email_form");
	// form.addEventListener("submit", function (e) {
	// 	setTimeout(function() {
	// 		submitButton.value = "Sending...";
	// 		submitButton.disabled = true;
	// 		console.log("sent email");
	// 	}, 1);
	// });


	var userRef = firebase.database().ref().child('users');
	$scope.users = $firebaseArray(userRef);
	// console.log("this is the user object");
	// console.log(users);

	$scope.sendMail = function() {
		var email = $scope.recipient;

		window.location.href = ("mailto:" + email +'?subject=hello&body=the_body&attachment=pdf.pdf');
    	// window.open('mailto:'+email+'?subject=hello&body=the_body');
    	$scope.recipient = "";
    };



    $scope.role = "my Current role";

    $scope.clicked = function() {
    	$scope.role = "I was clicked";
    }





	// $scope.curr_Auth = currentAuth;
	// console.log($scope.channels);
	// $scope.channel.name = "General";
	// $scope.channel.description = "general stuff";
	// $scope.channel.$save();


	// $scope.createChannel = function() {
	// 	$scope.channels[$scope.newChannelId] = {
	// 		name: $scope.newChannelName
	// 	};
	// 	$scope.channels.$save();
	// };

	// $scope.signOut = function() {
	// 	console.log("hi");
	// 	$firebaseAuth.$signOut();
	// 	$location.path('/login');
	// 	console.log("signed out");
	// };


});

app.controller("homeCtrl", function($scope, $firebaseObject, $firebaseArray, $routeParams, currentAuth, $firebaseAuth) {
	var ref = firebase.database().ref().child('messages').child($routeParams.channelId);
	$scope.messages = $firebaseArray(ref);
	console.log($scope.messages);
	$scope.curr_channel = $routeParams.channelId;

	var ref2 = firebase.database().ref().child('users');
	$scope.users = $firebaseObject(ref2);
	$scope.myName = $scope.users.name;



	$scope.sendMessage = function() {
		$scope.messages.$add({
			sender:currentAuth.uid,
			text: $scope.newMessage,
			created_at: Date.now()
		});
		$scope.newMessage = "";
		console.log(currentAuth.uid);
	};

	
});



app.controller("signupCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {
	
	$scope.authObj = $firebaseAuth();

	$scope.signUp = function() {

		$scope.authObj.$createUserWithEmailAndPassword($scope.email, $scope.password)
		.then(function(firebaseUser) { 
			console.log("User " + firebaseUser.uid + " created successfully!");
			
			var ref = firebase.database().ref().child('users').child(firebaseUser.uid);
			$scope.users = $firebaseObject(ref);

			$scope.users.name = $scope.name;
			
			$scope.users.$save();
			$scope.name = "";
			$scope.email = "";
			$scope.password = "";
			$location.path('/');
		}).catch(function(error) {
			console.error("Error: ", error);
			$scope.error_message = error.message;
			// console.log(error_message);
		});
		
		
	}

});

app.controller("loginCtrl", function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {
	
	$scope.authObj = $firebaseAuth();

	$scope.login = function() {

		$scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
			console.log("Signed in as:", firebaseUser.uid);
			$location.path('/');

		}).catch(function(error) {
			console.error("Authentication failed:", error);
			$scope.error_message = error.message;
		});

	}

});







// <a href="mailto:"+ email + "?subject=my subject&body=see attachment&attachment="+"/my_location_virtual_path/myfile.lis">hi</a>














