'use strict';

angular.module('cdreamApp')
  .controller('LoginCtrl', function ($scope, $http, $window, socket, $cookies, loginService, $routeParams, notificationService, utilService) {
    $scope.user = {};
    $scope.softVersion = loginService.getSoftwareVersion();
    utilService.pinesNotify();

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
        if(user.email !== undefined){
          $cookies.user = user.email;
          $window.location.href = "/landing/" + user.email + "登陆成功";
        }else{
          notificationService.error("错误的用户名和密码，请重试");
        }
      });
    }
  });
