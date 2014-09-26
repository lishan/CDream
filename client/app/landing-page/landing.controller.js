'use strict';

angular.module('cdreamApp')
  .controller('LandCtrl', function ($scope, $http, socket, $cookies, $window, loginService) {
    $scope.user = $cookies.user;
    $scope.softVersion = loginService.getSoftwareVersion();

    $scope.logout = function () {
      $cookies.user = '';
      $window.location.href = "/";
    };

    $scope.goAdmin = function () {
      if ($cookies.user !== '' && $cookies.user !== 'undefined') {
        $window.location.href = "/admin";
      } else {
        $window.location.href = "/login";
      }
    };

    $scope.testLogin = function () {
      return $scope.user !== '' && $scope.user !== undefined;
    }
  });
