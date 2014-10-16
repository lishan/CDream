'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/schedule', {
        templateUrl: 'app/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      });
  });
