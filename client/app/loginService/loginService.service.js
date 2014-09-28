'use strict';

angular.module('cdreamApp')
  .service('loginService', function ($window, $http, $cookies) {
    this.getCookieData = function ($scope) {
      $scope.user = $cookies.user;
      if ($scope.user === '' || $scope.user === undefined) {
        $window.location.href = "/";
      }
      $http.get('/api/users/find/' + $scope.user).success(function (user) {
        $scope.loginUser = user;
        $scope.dreams = [];
        $scope.tags = [];
        user.dream.forEach(function (value) {
          $http.get('/api/dreams/' + value).success(function (dream) {
            $scope.dreams.push(dream);
          });
        });
        user.tag.forEach(function (value) {
          $http.get('/api/tags/' + value).success(function (tag) {
            $scope.tags.push(tag);
          });
        });
        $scope.numDreams = user.dream.length;
        $scope.numTags = user.tag.length;
      });
    };

    this.getSoftwareVersion = function () {
      return 0.2;
    }
  });
