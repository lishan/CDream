'use strict';

angular.module('cdreamApp')
  .controller('TagsCtrl', function ($scope, $http, socket, $cookies, $modal, loginService, utilService, notificationService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();

    $scope.add = function () {
      var split = $scope.tag.split(":");
      $scope.tag = '';
      $http.post("/api/tags", {_user: $scope.loginUser._id, name: split[0], color: split[1], icon: split[2], info: split[3]}).success(function (tag) {
        $http.post("/api/users/addTag/" + $scope.loginUser._id, {tag: tag._id});
        loginService.getCookieData($scope);
        notificationService.success("创建 " + split[0] + " 成功");
      }).error(function (e) {
        notificationService.error("创建 " + split[0] + "失败");
      });
    }
  });


