'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies, $window, $modal) {
    $scope.user = $cookies.user;
    if ($scope.user === '' || $scope.user === undefined) {
      $window.location.href = "/";
    }
    $http.get('/api/users/find/user/' + $scope.user).success(function (user) {
      $scope.loginUser = user;
      $scope.dreams = [];
      user.dream.forEach(function (value) {
        $http.get('/api/dreams/' + value).success(function (dream) {
          $scope.dreams.push(dream);
        });
      });
      $scope.numDreams = user.dream.length;
    });

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
    $scope.transTime = function(time){
      var minTime = (new Date() - new Date(time))/1000;
      if(minTime < 60){
        return parseInt(minTime) + "秒前";
      }
      minTime/=60;
      if(minTime < 60){
        return parseInt(minTime) + "分钟前";
      }
      minTime/=60;
      if(minTime < 24){
        return parseInt(minTime) + "小时前";
      }
      minTime/=24;
      if(minTime < 11){
        return parseInt(minTime) + "天前";
      }
      return new Date(time).toString('yyyy-MM-dd');
    }
  });

angular.module('cdreamApp')
  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, user) {
    $scope.dream = {};
    $scope.ok = function () {
      $http.post("/api/dreams/", {name: $scope.dream.name, createTime: new Date()}).success(function (dream) {
        $http.post("/api/users/add/" + user._id, {dream: dream._id});
        $modalInstance.close(dream);
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
