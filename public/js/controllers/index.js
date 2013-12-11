angular.module('mean.system').controller('IndexController', ['$scope', '$http', '_', 'Global', function ($scope, $http, _, Global) {
    $scope.global = Global;
	
	$scope.breedInfo = undefined;
	$scope.species = undefined;
	$scope.breeds = undefined;
	
	$scope.selectedSpecies = undefined;
	$scope.selectedBreed = undefined;
	
	$http.jsonp('https://api.rescuegroups.org/http/json?data={"apikey":"sg0aTX1x","objectType":"animalBreeds","objectAction":"publicList","fields":["animalBreeds"]}&callback=JSON_CALLBACK').
		success(function(data, status) {
			$scope.breedInfo = data.data;
			$scope.species = _.chain($scope.breedInfo).pluck('species').unique().value();
			$scope.breeds = _.chain($scope.breedInfo).pluck('name').unique().value();
		}).
		error(function(data, status) {
			console.log('error');
			console.log('Data : ' + data);
			console.log('Status : ' + status);
		});
		
	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8
	};
	
	new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
}]);