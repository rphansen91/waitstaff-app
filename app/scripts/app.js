'use strict';

(function (window) {
  window.app = angular.module('waitstaffApp', ['ngCookies','ngResource','ngSanitize','ngRoute','ngAnimate']);
  window.app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/meal', {
        templateUrl: 'views/meal.html'
      })
      .when('/tips', {
        templateUrl: 'views/tips.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  window.app.controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
}(window));


  
