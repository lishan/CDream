'use strict';

angular.module('cdreamApp')
  .controller('SignCtrl', function ($scope, $http, $location, socket, $window, $cookies, loginService, notificationService, utilService) {
    $scope.softVersion = loginService.getSoftwareVersion();
    utilService.pinesNotify();
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
      $http.get('/api/users/find/' + $scope.email).success(function (user) {
        if(user === null || user === 'null'){
          $http.post('/api/users/', {email: $scope.email, pass: $scope.pass});
          $cookies.user = $scope.email;
          $window.location.href = "/landing/" + "欢迎" + $scope.email;
        }else {
          notificationService.error("已经被注册的用户名" + $scope.email);
        }
      });
    }
  });
