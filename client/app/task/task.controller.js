'use strict';

angular.module('cdreamApp')
  .controller('TaskCtrl', function ($scope, loginService, notificationService, utilService) {
    loginService.getCookieData($scope,true);
    $scope.softVersion = loginService.getSoftwareVersion();

  });

