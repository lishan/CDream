'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/plan', {
        templateUrl: 'app/plan/plan.html',
        controller: 'PlanCtrl'
      });
  });
