// MAIN MODULE
var youWishedApp = angular.module('youWished', ['ngRoute', 'ngResource']);

// ROUTES
youWishedApp.config(function($routeProvider) {
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
youWishedApp.controller('homeController', ['$scope', function($scope) {
    
}]);

youWishedApp.controller('forecastController', ['$scope', function($scope) {
    
}]);
