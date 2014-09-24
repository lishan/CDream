'use strict';

angular.module('cdreamApp')
  .controller('AdminCtrl', function ($scope, $http, socket, $cookies, $window) {
    $scope.user = $cookies.user;
    if($scope.user === '' || $scope.user === undefined){
      $window.location.href = "/";
    }
//    $http.get('/api/users/find/user/' + $scope.user).success(function(user){
//      $http.post('/api/users/add/' + user._id, {
//        name: 'tester',
//        info: '',
//        createTime: '2014-09-24',
//        finished: false
//      });
//    });
    $http.get('/api/users/find/user/' + $scope.user).success(function(user){
      $scope.dreams = user.dream;
      $scope.numDreams = user.dream.length;
    });

  });
