'use strict';

angular.module('cdreamApp')
  .controller('DreamCtrl', function ($scope, $http, loginService, utilService, $routeParams) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();

    $http.get("/api/dreams/" + $routeParams.dreamId).success(function(dream){
      $scope.dream = dream;
    });
    $scope.choose = function (dream) {
      if (dream !== null && dream !== undefined) {
        return $routeParams.dreamId === dream._id;
      }
      return false;
    }

    $scope.changeToMarkDown = function(str){
        console.log(str);
        return toMarkdown(str);
    }
  });
