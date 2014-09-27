'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/task', {
        templateUrl: 'app/task/task.html',
        controller: 'TaskCtrl'
      });
  });
