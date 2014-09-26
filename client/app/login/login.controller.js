'use strict';

angular.module('cdreamApp')
  .controller('LoginCtrl', function ($scope, $http, $window, socket, $cookies, loginService) {
    $scope.user = {};
    $scope.softVersion = loginService.getSoftwareVersion();
    $scope.click = function () {
      $scope.emailWrong = false;
      $scope.passWrong = false;
      if ($scope.email === undefined) {
        $scope.emailWrong = true;
      }
      if ($scope.pass === undefined) {
        $scope.passWrong = true;
      }
      if ($scope.emailWrong || $scope.passWrong) {
        return;
      }
      $http.get('/api/users/' + $scope.email + "&" + $scope.pass).success(function (user) {
        if(user.email !== undefined){
          $cookies.user = user.email;
        }
        $window.location.href = "/";
      });
    }
  });
