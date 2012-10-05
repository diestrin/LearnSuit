'use strict';

// COntrollers

function loginController ($scope, $http, $location){
	if(localStorage.getItem("usrInfo") === "dGVzdH4vfnRlc3Q="){
		$location.url("/!");
	}

	$scope.login = function(){
		if($scope.username == "test" && $scope.password == "test"){
			localStorage.setItem("usrInfo", btoa($scope.username + "~/~" + $scope.password));
			$location.url("/!");
		}else{
			$scope.error = "Your user and passwrod didn't match."
		}
	}

	$scope.error = false;
}

function homeController ($scope, $routeParams, $http, $location, bookLibrary){
	if(localStorage.getItem("usrInfo") !== "dGVzdH4vfnRlc3Q=") 
		$location.url("/login");

	var query = !!$routeParams.path && $routeParams.path.replace(/\w+\.\w+$/, '') ? 
		"path=" + $routeParams.path.replace(/\/\w+\.\w+$/, '') + "&" : "";

	bookLibrary(function(){
		$scope.fields = this.get($routeParams.path);
	});
	
	function isSelected(itemPath){
		return itemPath === $routeParams.path && isBook(itemPath) ? "active" : "";
	}

	function isBook(itemPath){
		var is = false;

		angular.forEach($scope.fields, function(book){
			if(book.url === itemPath && book.type === "file")
				return is = true;
		});

		return is;
	}

	function getSelected(){
		var selected;

		angular.forEach($scope.fields, function(book){
			if(book.url === $routeParams.path)
				return selected = book;
		});

		return selected
	}

	$scope.selected = getSelected();
	$scope.isSelected = isSelected;
	$scope.isBook = isBook;
	$scope.getSelected = getSelected;

	if(!!$scope.selected && !isBook($scope.selected.url)){
		$scope.fields = $scope.selected.items;
	}
}