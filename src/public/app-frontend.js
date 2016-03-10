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
        .when('/forecast/:days', {
            templateUrl: 'html/forecast.html',
            controller: 'forecastController'
        })
});

// SERVICES
weatherApp.service('cityService', function() {
    this.city = 'New York, NY';
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams) {
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2; // default to 2 
    
    var appid = '829cd2f80080d0cc54367583001a15dd';
    $scope.weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=' + appid, { callback: 'JSON_CALLBACK' }, { get: { method: 'JSONP' }});
    
    $scope.weatherResult = $scope.weatherApi.get({ q: $scope.city, cnt: $scope.days, units: 'metric'});
    
    $scope.convertToDate = function convertToDate(dt) {
        return new Date(dt * 1000);
    }
}]);
