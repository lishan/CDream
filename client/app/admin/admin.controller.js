'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, userService) {
    console.log($scope.user);
    $scope.user = userService.getUser();
  });
