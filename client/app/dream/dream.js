'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dream', {
        templateUrl: 'app/dream/dream.html',
        controller: 'DreamCtrl'
      }).when('/dream/:dreamId', {
        templateUrl: 'app/dream/dream.html',
        controller: 'DreamCtrl'
      }).when('/dream/:dreamId&:message', {
        templateUrl: 'app/dream/dream.html',
        controller: 'DreamCtrl'
      });
  });
