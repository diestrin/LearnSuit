'use strict';

// App Module

angular.module("learningcenter", [], function($provide){
	$provide.factory("bookLibrary", ["$http", function($http){
			var libraryResources;

			function fetchResources(callback){
				$http({
					method: "jsonp",
					url: 'http://localhost/getFolders.php?callback=JSON_CALLBACK'
				})
				.success(function(data, status){
					libraryResources = data;
					callback();
				});
			}

			function initLibrary(callback){
				if(!libraryResources){
					fetchResources(callback);
				}else{
					callback();
				}
			}

			function Library(callback){
				initLibrary(function(){
					callback.apply(Library, []);
				});
			}

			Library.get = function(path){
				var output = [];

				function recursive(pathSection, paths, length){
					angular.forEach(libraryResources, function(resource, index){
						if("url" in resource && resource.url === pathSection){
							if(length > 0){
								recursive(paths
									.slice(0, paths.length - length - 1)
									.join("/"), paths, length - 1);
							}else{
								angular.forEach(resource.items, function(propery){
									output.push(removeItems(propery));
								});
							}
						}

					});
				}

				function removeItems(i){
					var o = {},
						item;

					for(item in i)
						if(item !== "items")
							o[item] = i[item];

					return o;
				}

				if(path){
					path = path.replace(/\/\w+?\.?\w+?$/,'').replace(/\/$/);
					path = path.split("/");

					recursive(path[0], path, path.length-1);
				}else{
					angular.forEach(libraryResources, function(resource){
						output.push(removeItems(resource));
					});
				}

				return output;
			}

			Library.resources;
			Library.currentPath = "";
	
			return Library;
		}]);
})
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