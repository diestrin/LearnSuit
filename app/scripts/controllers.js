'use strict';

// COntrollers

function loginController ($scope, $http, $location, bookLibrary){
	bookLibrary(function(){}, true);

	if(localStorage.getItem("usrInfo") === "dGVzdH4vfnRlc3Q="){
		$location.url("/!");
	}

	function login(){
		if($scope.username == "test" && $scope.password == "test"){
			localStorage.setItem("usrInfo", btoa($scope.username + "~/~" + $scope.password));
			$location.url("/!");
		}else{
			$scope.error = "Your user and passwrod didn't match."
		}
	}

	$scope.login = login;
	$scope.error = false;
}

function homeController ($scope, $routeParams, $http, $location, bookLibrary){
	if(localStorage.getItem("usrInfo") !== "dGVzdH4vfnRlc3Q=") 
		$location.url("/login");

	bookLibrary(function(){
		$scope.fields = this.get($routeParams.path);
		$scope.totalFiles = this.getTotalFiles();

		(function($scope, $routeParams){
			var selected;

			angular.forEach($scope.fields.files, function(book){
				if(book.path === $routeParams.path)
					return selected = book;
			});

			$scope.selected = selected
		})($scope, $routeParams);
	});
	
	function isSelected(itemPath){
		return itemPath === $routeParams.path ? "active" : "";
	}

	function isDirActive(folderPath){
		if(folderPath === "" && !remporalPath)
			return "active";

		var remporalPath = $routeParams.path.replace(/\/\w+\.\w+/, '');

		return folderPath === remporalPath ? "active" : "";
	}

	function beautyName(uglyName) {
		if(!uglyName) return "";

		uglyName[0] = uglyName[0].toUpperCase();

		angular.forEach(uglyName.match(/[a-z][A-Z]/g), function(match){
			uglyName = uglyName.replace(match, match[0] + " " + match[1]);
		});

		uglyName = uglyName.replace(/\.\w+$/,'').replace(/[-_\.\+]/g,' ');

		angular.forEach(uglyName.match(/ [a-z]/g), function(match){
			uglyName = uglyName.replace(match, match.toUpperCase());
		})

		return uglyName; //--> Now it's beauty!
	}

	function isVisible(item){
		if(!item) return false;

		switch(item.type){
			case "txt":
				return true;
			case "mp4":
				return true;
			default:
				return false;
		}
	}

	(function(currentPath){
		var returnArray = [{
			url: "",
			name: "Home"
		}],
			tempObject,
			lastPath = "";

		if(currentPath){
			angular.forEach(currentPath.split("/"), function(path){
				if(path.match(/^\w+\.\w+$/))
					return;

				tempObject = {
					url: lastPath + path,
					name: path
				};

				lastPath = tempObject.url + "/";
				returnArray.push(tempObject);
			});
		}

		$scope.deep = returnArray;
	})($routeParams.path);

	$scope.isSelected = isSelected;
	$scope.isDirActive = isDirActive;
	$scope.beautyName = beautyName;
	$scope.isVisible = isVisible;
}

function viewController ($scope, $routeParams, $http, $location){
	if(localStorage.getItem("usrInfo") !== "dGVzdH4vfnRlc3Q=") 
		$location.url("/login");
	
	$scope.url = "/learn/" + $routeParams.path;

	// $http({
	// 	method: "get",
	// 	url: "/phpFiles/" + $routeParams.path
	// }).success(function(data){
	// 	$scope.content = data;
	// });
}