'use strict';

angular.module('cdreamApp')
  .controller('LandCtrl', function ($scope, $http, socket, $cookies, $routeParams, $location, loginService, notificationService, utilService) {
    $scope.user = $cookies.user;
    $scope.softVersion = loginService.getSoftwareVersion();


    $scope.logout = function () {
      var tmpUser = $cookies.user;
      $cookies.user = '';
      $scope.user = '';
      notificationService.info(tmpUser + "登出成功");
    };

    $scope.goAdmin = function () {
      if ($cookies.user !== '' && $cookies.user !== undefined) {
        $location.path("/admin");
      } else {
        $location.path("/login");
        notificationService.info("请先登录");
      }
    };

    $scope.testLogin = function () {
      return $scope.user !== '' && $scope.user !== undefined;
    }
  });
