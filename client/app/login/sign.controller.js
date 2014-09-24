'use strict';

angular.module('cdreamApp')
  .controller('SignCtrl', function ($scope, $http, $location, socket ,$window) {
    $scope.click = function(){
        $scope.emailWrong = false;
        $scope.passWrong = false;
        $scope.conPassWrong = false;
        $scope.alreadySign = false;
        if($scope.email === undefined){
            $scope.emailWrong = true;
        }
        if($scope.pass === undefined){
            $scope.passWrong = true;
        }
        if($scope.pass !== $scope.conPass){
            $scope.conPassWrong = true;
        }
        $http.get('/api/users/find/'+$scope.email).success(function(user) {
            console.log(user);
            $scope.alreadySign = user;
        });
        if($scope.emailWrong || $scope.passWrong || $scope.conPassWrong || $scope.alreadySign){
            return;
        }
        $http.post('/api/users/',{email : $scope.email, pass : $scope.pass});
        $window.location.href = "/";
    }
  });
