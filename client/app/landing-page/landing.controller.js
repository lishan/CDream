'use strict';

angular.module('cdreamApp')
  .controller('LandCtrl', function ($scope, $http, socket, $cookies, $location, $window) {
    $scope.user = $cookies.user;

    $scope.logout = function(){
        $cookies.user = '';
        $window.location.href = "/";
    }

    $scope.goAdmin = function(){
        if($cookies.user !== ''){
            $window.location.href = "/admin";
        }else{
            console.log($location.path());
            $window.location.href = "/login";
        }
    }

    $scope.testLogin = function(){
        return $scope.user !== '';
    }
  });
