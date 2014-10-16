'use strict';

angular.module('cdreamApp')
  .controller('SignCtrl', function ($scope, $http, $location, socket, $cookies, loginService, notificationService, hotkeys) {
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
      $scope.conPassWrong = false;
      $scope.alreadySign = false;
      if ($scope.email === undefined) {
        $scope.emailWrong = true;
      }
      if ($scope.pass === undefined) {
        $scope.passWrong = true;
      }
      if ($scope.pass !== $scope.conPass) {
        $scope.conPassWrong = true;
      }
      if ($scope.emailWrong || $scope.passWrong || $scope.conPassWrong) {
        notificationService.error("请重试");
        return;
      }
      $http.get('/api/users/findEmail/' + $scope.email).success(function (user) {
        if (user === null || user === 'null') {
          $http.post('/api/users/', {email: $scope.email, pass: $scope.pass});
          $cookies.user = $scope.email;
          $location.path("/");
          notificationService.success("欢迎" + $scope.email);
        } else {
          notificationService.error("已经被注册的用户名" + $scope.email);
        }
      });
    }
  });
