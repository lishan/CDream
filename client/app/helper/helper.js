'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/helper/icon', {
        templateUrl: 'app/helper/helperIcon.html',
        controller: 'HelperIconCtrl'
      })
      .when('/helper1', {
        templateUrl: 'app/helper/help1.html',
        controller: 'HelperIconCtrl'
      });
  });
