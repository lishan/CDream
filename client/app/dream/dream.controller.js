'use strict';

angular.module('cdreamApp')
    .controller('DreamCtrl', function ($scope, $http, loginService, utilService, $routeParams, notificationService) {
        loginService.getCookieData($scope);
        $scope.softVersion = loginService.getSoftwareVersion();

        $http.get("/api/dreams/find/" + $routeParams.dreamId).success(function (dream) {
            $scope.dream = dream;
            $scope.tasks = dream.tasks;
        });
        $scope.choose = function (dream) {
            if (dream !== null && dream !== undefined) {
                return $routeParams.dreamId === dream._id;
            }
            return false;
        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.selectTags = [];
        $scope.addTag = function () {
            var flag = false;
            for (var index in $scope.selectTags) {
                if ($scope.selectTags[index]._id === $scope.selectTag._id) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                $scope.selectTags.push($scope.selectTag);
            }
            $scope.selectTag = null;
        };

        $scope.removeTag = function (tag) {
            var index = 0;
            for (index in $scope.selectTags) {
                if ($scope.selectTags[index]._id === tag._id) {
                    $scope.selectTags.splice(index, 1);
                    break;
                }
            }
        };

        $scope.save = function () {
            var arr = [];
            for (var index in $scope.selectTags) {
                arr.push($scope.selectTags[index]._id);
            }
            $http.post("/api/tasks", {_dream: $scope.dream._id, name: $scope.task, dueTime: $scope.dt, tags: arr, createTime: new Date()}).success(function (task) {
                $http.post("/api/dreams/addTask/" + $scope.dream._id, {task: task._id});
                $scope.task = null;
                $scope.selectTags = null;
                $scope.selectTags = [];
                $scope.dt = null;
                notificationService.success("添加" + task.name + "成功");
            }).error(function () {
                notificationService.success("添加" + $scope.task + "失败");
            });
        }

    });
