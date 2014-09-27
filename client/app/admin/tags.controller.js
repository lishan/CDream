'use strict';

angular.module('cdreamApp')
  .controller('TagsCtrl', function ($scope, $http, socket, $cookies, $modal, loginService, $window) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();

    $scope.add = function(){
      var split = $scope.tag.split(":");
      $http.post("/api/tags",{name: split[0], color: split[1], icon: split[2], info: split[3]}).success(function(tag){
        $http.post("/api/users/addTag/" + $scope.loginUser._id, {tag: tag._id});
      });

      $window.location.href = "/tags";
    }

  });


