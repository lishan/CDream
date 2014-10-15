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

        $scope.unfinishedDreams = [];
        for (var index in user.dreams) {
          if (!user.dreams[index].finished) {
            $scope.unfinishedDreams.push(user.dreams[index]);
          }
        }
      }).error(function(){
        $location.path("/");
      });
    };

    this.getSoftwareVersion = function () {
      return 1.1;
    }
  });
