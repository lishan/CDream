'use strict';

angular.module('cdreamApp')
  .controller('LandCtrl', function ($scope, $http, socket, $cookies, $routeParams, $window, loginService, notificationService) {
    $scope.user = $cookies.user;
    $scope.softVersion = loginService.getSoftwareVersion();
    if($routeParams.message !== '' && $routeParams.message !== undefined){
      notificationService.info($routeParams.message);
    }

    $scope.logout = function () {
      var tmpUser = $cookies.user;
      $cookies.user = '';
      $window.location.href = "/landing/" + tmpUser + "登出成功";
    };

    $scope.goAdmin = function () {
      if ($cookies.user !== '' && $cookies.user !== undefined) {
        $window.location.href = "/admin";
      } else {
        $window.location.href = "/login/请先登录";
      }
    };

    $scope.testLogin = function () {
      return $scope.user !== '' && $scope.user !== undefined;
    }
  });
