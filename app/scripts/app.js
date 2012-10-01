'use strict';

// App Module

angular.module("learningcenter", [])
	.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
		//$locationProvider.html5Mode(true);
		$routeProvider
			.when("/login", {
				templateUrl: "views/login.html",
				controller: loginController
			})
			.when("/!/:path", {
				templateUrl: "views/home.html",
				controller: homeController
			})
			.when("/!", {
				templateUrl: "views/home.html",
				controller: homeController
			})
			.otherwise({
				redirectTo: "/login"
			});
	}]);