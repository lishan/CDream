'use strict';

angular.module('cdreamApp')
  .controller('ProfileCtrl', function ($scope, $http, socket, $location, $cookies, loginService, $routeParams, notificationService, hotkeys) {
    loginService.getCookieData($scope);

    $scope.click = function () {
          if ($scope.loginUser.pass === undefined) {
            notificationService.error("请重试");
            return;
          }
          $http.put('/api/users/' + $scope.loginUser._id, {pass :$scope.loginUser.pass, address: $scope.loginUser.address, qq: $scope.loginUser.qq, mobile: $scope.loginUser.mobile}).success(function (user) {
            if (user.email !== undefined) {
              notificationService.success(user.email + "修改信息成功");
              $location.path("/admin");
            } else {
              notificationService.error("修改信息失败");
            }
          });
    };
  });
