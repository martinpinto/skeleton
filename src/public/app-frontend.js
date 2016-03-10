// MAIN MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/home.htm',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'html/forecast.html',
            controller: 'forecastController'
        })
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
}]);

// SERVICES
weatherApp.service('cityService', function() {
    this.city = 'New York, NY';
});