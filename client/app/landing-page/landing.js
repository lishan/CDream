'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/landing-page/index.html',
        controller: 'LandCtrl'
      }).when('/landing/:message', {
        templateUrl: 'app/landing-page/index.html',
        controller: 'LandCtrl'});
  });
