'use strict';

angular.module('cdreamApp')
  .service('loginService', function ($location, $http, $cookies) {
    this.getCookieData = function ($scope, loadAllTasks) {
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

        loadAllTasks = typeof loadAllTasks !== "undefined" ? loadAllTasks : false;
        $scope.allTasks = [];
        for(var index in $scope.dreams){
           $scope.allTasks = $scope.allTasks.concat($scope.dreams[index].tasks);
        }

        if(loadAllTasks){
           $scope.detailAllTasks = [];
           for(var index in $scope.allTasks){
             $http.get('/api/tasks/find/' + $scope.allTasks[index]._id).success(function (task) {
                $scope.detailAllTasks.push(task);
             });
           }
        }

        $scope.numTasks = $scope.allTasks.length;
      }).error(function(){
        $location.path("/");
      });
    };

    this.getSoftwareVersion = function () {
      return 1.4;
    }
  });
