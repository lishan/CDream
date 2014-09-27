'use strict';

angular.module('cdreamApp')
  .controller('TaskCtrl', function ($scope, loginService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
  });
