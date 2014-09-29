'use strict';

angular.module('cdreamApp')
  .controller('TaskCtrl', function ($scope, loginService, notificationService, utilService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
    utilService.pinesNotify();
  });

