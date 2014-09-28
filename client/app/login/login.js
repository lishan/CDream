'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      }).when('/login/:message', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      }).when('/sign', {
        templateUrl: 'app/login/sign.html',
        controller: 'SignCtrl'
      }).when('/sign/:message', {
        templateUrl: 'app/login/sign.html',
        controller: 'SignCtrl'
      });
  });
