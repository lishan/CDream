'use strict';

angular.module('cdreamApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/index.html',
        controller: 'AdminCtrl'
      }).when('/panels-wells', {
        templateUrl: 'app/admin/panels-wells.html'
      }).when('/buttons', {
        templateUrl: 'app/admin/buttons.html'
      }).when('/notifications', {
        templateUrl: 'app/admin/notifications.html'
      }).when('/typography', {
        templateUrl: 'app/admin/typography.html'
      }).when('/grid', {
        templateUrl: 'app/admin/grid.html'
      }).when('/login', {
        templateUrl: 'app/admin/login.html'
      }).when('/blank', {
         templateUrl: 'app/admin/blank.html'
      }).when('/tables', {
        templateUrl: 'app/admin/tables.html'
      }).when('/forms', {
        templateUrl: 'app/admin/forms.html'
      });
  });
