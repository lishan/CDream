'use strict';

angular.module('cdreamApp')
  .controller('DreamCtrl', function ($scope, $http, loginService, utilService, $routeParams) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();
    utilService.pinesNotify();
    $scope.choose = function(dream){
        if(dream !== null && dream !== undefined){
            return $routeParams.dreamId === dream.id;
        }
        return false;
    }
  });
