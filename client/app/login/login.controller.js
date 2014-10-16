'use strict';

angular.module('cdreamApp')
  .controller('LoginCtrl', function ($scope, $http, socket, $location, $cookies, loginService, $routeParams, notificationService, hotkeys) {
    $scope.user = {};
    $scope.softVersion = loginService.getSoftwareVersion();

    hotkeys.bindTo($scope)
      .add({
        combo: 'enter',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
          $scope.click();
        }
      }).add({
        combo: 'esc',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
          $location.path("/");
        }
      });

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
        notificationService.error("请重试");
        return;
      }
      $http.get('/api/users/' + $scope.email + "&" + $scope.pass).success(function (user) {
        if (user.email !== undefined) {
          $cookies.user = user.email;
          $location.path("/");
          notificationService.success(user.email + "登陆成功");
        } else {
          notificationService.error("错误的用户名和密码，请重试");
        }
      });
    };
  });
