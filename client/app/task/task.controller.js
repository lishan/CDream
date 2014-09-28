'use strict';

angular.module('cdreamApp')
  .controller('TaskCtrl', function ($scope, loginService, notificationService) {
    notificationService.success('success');
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
  });
