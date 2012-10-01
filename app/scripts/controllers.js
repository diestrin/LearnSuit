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

function homeController ($scope, $routeParams, $http, $location, $rootScope){
	if(localStorage.getItem("usrInfo") !== "dGVzdH4vfnRlc3Q=") 
		$location.url("/login");

	function win(data){
		$scope.fields = data;
	}
	
	function isSelected(itemId){
		return itemId === $routeParams.path && isBook(itemId) ? "active" : "";
	}

	function isBook(itemId){
		var is = false;

		angular.forEach($scope.fields, function(book){
			if(book.id === itemId && book.type === "file")
				return is = true;
		});

		return is;
	}

	function getSelected(){
		var selected;

		angular.forEach($scope.fields, function(book){
			if(book.id === $routeParams.path)
				return selected = book;
		});

		return selected
	}

	if(!$rootScope.fields){
		// $http({
		// 	method: "jsonp",
		// 	url: 'http://localhost/getFolder.php?callback=JSON_CALLBACK&' + $routeParams.path
		// })
		// .success(function(data, status){
		// 	win(data);
		// })
		// .error(function(data, status){
		// 	win(data);
		// });
		$http({
			method: "jsonp",
			url: 'http://localhost/getFolders.php?callback=JSON_CALLBACK'
		})
		.success(function(data, status){
			$rootScope.fields = data;
			$scope.fields = $rootScope.fields;
		})
		.error(function(data, status){
			$rootScope.fields = data;
			$scope.fields = $rootScope.fields;
		});
	}

	$scope.fields = $rootScope.fields;

	$scope.selected = getSelected();
	$scope.isSelected = isSelected;
	$scope.isBook = isBook;
	$scope.getSelected = getSelected;

	if(!!$scope.selected && !isBook($scope.selected.id)){
		$scope.fields = $scope.selected.items;
	}
}