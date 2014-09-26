'use strict';

angular.module('cdreamApp')
  .service('loginService', function ($window, $http, $cookies) {
    this.getCookieData = function ($scope) {
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
    };

    this.getSoftwareVersion = function () {
      return 0.1;
    }
  });
