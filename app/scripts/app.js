'use strict';

// App Module

angular.module("learningcenter", [], function($provide){
	$provide.factory("bookLibrary", ["$http", function($http){
			var libraryResources,
				quiteMode = false;

			function fetchResources(callback){
				if(!quiteMode) $("#loading").modal({"backdrop": "static"});

				$http({
					method: "get",
					url: '/learn/books/tutsindex/getItems.php'
				})
				.success(function(data, status){
					if(!quiteMode) $("#loading").modal("hide");
					
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

			function Library(callback, quiet){
				quiteMode = quiet;
				initLibrary(function(){
					callback.apply(Library, []);
				});
			}

			Library.getTotalFiles = function(){
				return libraryResources.totalFiles;
			}

			Library.get = function(path){
				var output = {
					folders:[],
					files:[]
				};

				function recursive(resources, pathSection, paths, length){
					angular.forEach(resources, function(resource, index){
						if("path" in resource && resource.path === pathSection){
							if(length > 0){
								recursive(resource.items.folders, paths.slice(0, paths.length-length+1).join("/"), paths, length - 1);
							}else{
								angular.forEach(resource.items.folders, function(propery){
									output.folders.push(removeItems(propery));
								});
								angular.forEach(resource.items.files, function(propery){
									output.files.push(removeItems(propery));
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

				if(path && !path.match(/^([\w\s&-]+\.\w+)+$/)){
					path = path.replace(/\/([\w\s&-]+\.\w+)?$/,'').replace(/\/$/,'');
					path = path.split("/");

					recursive(libraryResources.folders, path[0], path, path.length-1);
				}else{
					angular.forEach(libraryResources.folders, function(resource){
						output.folders.push(removeItems(resource));
					});
					angular.forEach(libraryResources.files, function(resource){
						output.files.push(removeItems(resource));
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
	// $locationProvider.html5Mode(true);
	$routeProvider
		.when("/login", {
			templateUrl: "/learn/books/tutsindex/views/login.html",
			controller: loginController
		})
		.when("/!/:path", {
			templateUrl: "/learn/books/tutsindex/views/home.html",
			controller: homeController
		})
		.when("/!", {
			templateUrl: "/learn/books/tutsindex/views/home.html",
			controller: homeController
		})
		.when("/view/:path", {
			templateUrl: "/learn/books/tutsindex/views/view.html",
			controller: viewController
		})
		.when("/mp4/:path", {
			templateUrl: "/learn/books/tutsindex/views/view.html",
			controller: viewController
		})
		.otherwise({
			redirectTo: "/login"
		});
}]);