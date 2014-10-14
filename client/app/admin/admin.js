'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/index.html',
        controller: 'AdminCtrl'
      }).when('/login', {
        templateUrl: 'app/admin/login.html'
      }).when('/tags', {
        templateUrl: 'app/admin/tags.html',
        controller: 'TagsCtrl'
      });
  });
