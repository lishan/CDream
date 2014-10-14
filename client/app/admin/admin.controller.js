'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies, $modal, utilService, loginService, notificationService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
    $scope.choose = function (obj) {
      return obj === null || obj === undefined;
    };
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          user: function () {
            return $scope.loginUser;
          }
        }
      });
      modalInstance.result.then(function (dream) {
        $scope.dreams.push(dream);
        $scope.numDreams += 1;
      });
    };
    $scope.transTime = utilService.timeConventor;
    $scope.finish = function (dream) {
      if (dream.finished) {
        $http.put("/api/dreams/" + dream._id, {finished: false});
        notificationService.success(dream.name + "重新打开");
        dream.finished = false;
      } else {
        $http.put("/api/dreams/" + dream._id, {finished: true});
        notificationService.info(dream.name + "已完成");
        dream.finished = true;
      }
      loginService.getCookieData($scope);
    };
    $scope.setIconColor = function (dream, icon, color) {
      dream.icon = icon;
      dream.color = color;
      $http.put("/api/dreams/" + dream._id, {icon: icon, color: color});
    };
    $scope.deleteDream = function (dream) {
      $http.post("/api/users/removeDream/" + $scope.loginUser._id, {dream: dream._id}).success(function () {
        $http.delete("/api/dreams/" + dream._id);
        loginService.getCookieData($scope);
        notificationService.success("删除" + dream.name + "成功");
      }).error(function () {
        notificationService.error("删除" + dream.name + "失败");
      });
    }
  });

angular.module('cdreamApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, user, notificationService, hotkeys) {
    $scope.dream = {};

    hotkeys.bindTo($scope)
      .add({
        combo: 'enter',
        allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
        callback: function () {
          $scope.ok();
        }
      });
    $scope.ok = function () {
      $http.post("/api/dreams/", {_user: user._id, name: $scope.dream.name, createTime: new Date()}).success(function (dream) {
        $http.post("/api/users/addDream/" + user._id, {dream: dream._id});
        $modalInstance.close(dream);
        notificationService.success("添加" + $scope.dream.name + "成功");
      }).error(function () {
        $modalInstance.close(dream);
        notificationService.success("添加" + $scope.dream.name + "失败");
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
