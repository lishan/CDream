'use strict';

angular.module('cdreamApp')
  .controller('TagsCtrl', function ($scope, $http, socket, $cookies, $modal, loginService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();

  });


