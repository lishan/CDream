'use strict';

angular.module('cdreamApp')
  .controller('LandCtrl', function ($scope, $http, socket, userService) {
    $scope.user = userService.getUser();
  });
