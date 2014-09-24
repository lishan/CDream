'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies) {
    $scope.user = $cookies.user;
  });
