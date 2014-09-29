'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies, $window, $modal, utilService, loginService, notificationService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
    utilService.pinesNotify();
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
    };
    $scope.setIconColor = function (dream, icon, color) {
      dream.icon = icon;
      dream.color = color;
      $http.put("/api/dreams/" + dream._id, {icon: icon, color: color});
    };
    $scope.deleteDream = function (dream) {
      var i;
      for (i = 0; i < $scope.loginUser.dream.length; i++) {
        if ($scope.loginUser.dream[i] === dream._id) {
          break;
        }
      }
      if (i < $scope.loginUser.dream.length) {
        $scope.loginUser.dream.splice(i, 1);
        $http.post("/api/users/setDream/" + $scope.loginUser._id, {dream: $scope.loginUser.dream}).success(function(){
            $http.delete("/api/dreams/" + dream._id);
            $window.location.href = "/admin/" + "删除" + dream.name + "成功";
        });
      }else{
        $window.location.href = "/admin/" + "删除" + dream.name + "失败";
      }
    }
  });

angular.module('cdreamApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $window, $http, user, notificationService) {
    $scope.dream = {};
    $scope.ok = function () {
      $http.post("/api/dreams/", {name: $scope.dream.name, createTime: new Date()}).success(function (dream) {
        $http.post("/api/users/addDream/" + user._id, {dream: dream._id});
        $modalInstance.close(dream);
        $window.location.href = "/admin/" + "添加"+ $scope.dream.name + "成功";
      }).error(function(){
        $modalInstance.close(dream);
        $window.location.href = "/admin/" + "添加"+ $scope.dream.name + "失败";
      });

    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
