'use strict';

angular.module('cdreamApp')
  .controller('LoginCtrl', function ($scope, $http, socket) {
    $scope.message = 'Hello';

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
        $http.get('/api/users/').success(function(user) {

        });
    }
  });
