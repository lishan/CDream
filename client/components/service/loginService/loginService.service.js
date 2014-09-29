'use strict';

angular.module('cdreamApp')
  .service('loginService', function ($location, $http, $cookies) {
    this.getCookieData = function ($scope) {
      $scope.user = $cookies.user;
      if ($scope.user === '' || $scope.user === undefined) {
        $location.path("/");
      }
      $http.get('/api/users/find/' + $scope.user).success(function (user) {
        $scope.loginUser = user;
        $scope.dreams = user.dreams;
        $scope.tags = user.tags;
        $scope.numDreams = user.dreams.length;
        $scope.numTags = user.tags.length;
      });
    };

    this.getSoftwareVersion = function () {
      return 0.3;
    }
  });
