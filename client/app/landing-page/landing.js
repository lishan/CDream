'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/landing-page/index.html',
        controller: 'LandCtrl'
      }).otherwise({

      });
  });
