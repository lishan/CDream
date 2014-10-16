'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
