'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/test', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
