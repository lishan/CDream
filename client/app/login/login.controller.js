'use strict';

angular.module('cdreamApp')
  .controller('LoginCtrl', function ($scope, $http, $location, socket ,$cookies) {
    $scope.message = 'Hello';

    $scope.user = {};
    $scope.click = function(){
        $scope.emailWrong = false;
        $scope.passWrong = false;
        if($scope.email === undefined){
            $scope.emailWrong = true;
        }
        if($scope.pass === undefined){
            $scope.passWrong = true;
        }
        if($scope.emailWrong || $scope.passWrong){
            return;
        }
        $http.get('/api/users/'+$scope.email+"&"+$scope.pass).success(function(user) {
            $cookies.user = user.email;
            $location.path('/');
        });
    }
  });
