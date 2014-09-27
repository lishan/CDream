'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies, $window, $modal, utilService, loginService) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
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
        dream.finished = false;
      } else {
        $http.put("/api/dreams/" + dream._id, {finished: true});
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
        $http.post("/api/users/setDream/" + $scope.loginUser._id, {dream: $scope.loginUser.dream});
        $http.delete("/api/dreams/" + dream._id);
      }
      $window.location.href = "/admin";
    }
  });

angular.module('cdreamApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, user) {
    $scope.dream = {};
    $scope.ok = function () {
      $http.post("/api/dreams/", {name: $scope.dream.name, createTime: new Date()}).success(function (dream) {
        $http.post("/api/users/addDream/" + user._id, {dream: dream._id});
        $modalInstance.close(dream);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
