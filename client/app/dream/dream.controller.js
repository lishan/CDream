'use strict';

angular.module('cdreamApp')
  .controller('DreamCtrl', function ($scope, $http, loginService, utilService, $routeParams, notificationService, markdownPro) {
    loginService.getCookieData($scope);
    $scope.softVersion = loginService.getSoftwareVersion();

    function getData() {
      $http.get("/api/dreams/find/" + $routeParams.dreamId).success(function (dream) {
        $scope.dream = dream;
        $scope.tasks = dream.tasks;
      });
    }

    getData();

    $scope.choose = function (dream) {
      if (dream !== null && dream !== undefined) {
        return $routeParams.dreamId === dream._id;
      }
      return false;
    };

    $scope.removeTaskTag = function (tag, task) {
      for (var index in task.tags) {
        if (task.tags[index]._id === tag._id) {
          task.tags.splice(index, 1);
        }
      }
    };

    $scope.addTaskTag = function (task) {
      var flag = false;
      for (var index in task.tags) {
        if (task.tags[index]._id === task.selectTaskTag._id) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        task.tags.push(task.selectTaskTag);
      }
      task.selectTaskTag = null;
    };

    $scope.saveTask = function (task) {
      var tmpTags = [];
      for (var index in task.tags) {
        tmpTags.push(task.tags[index]._id);
      }
      $http.put("/api/tasks/" + task._id, {name: task.name, dueTime: task.dueTime, tags: tmpTags}).success(function () {
        getData();
        notificationService.success("修改" + task.name + "成功");
      }).error(function () {
        notificationService.error("修改" + task.name + "失败");
      });
    };

    $scope.finishedTask = function (task) {
      var flag = !task.finished;
      $http.put("/api/tasks/" + task._id, {finished: flag}).success(function () {
        getData();
        notificationService.success("完成" + task.name + "成功");
      }).error(function () {
        notificationService.error("完成" + task.name + "失败");
      });
    };

    $scope.deleteTask = function (task) {
      $http.post("/api/dreams/removeTask/" + $scope.dream._id, {task: task._id}).success(function () {
        $http.delete("/api/tasks/" + task._id);
        getData();
        notificationService.success("删除" + task.name + "成功");
      }).error(function () {
        notificationService.error("删除" + task.name + "失败");
      });
    };

    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.openTask = function ($event, task) {
      $event.preventDefault();
      $event.stopPropagation();

      task.opened = true;
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
        loginService.getCookieData($scope);
        getData();
        notificationService.success("添加" + task.name + "成功");
      }).error(function () {
        notificationService.success("添加" + $scope.task + "失败");
      });
    };

    $scope.parseHtml = function (str) {
      return markdownPro.changeHtml(str);
    };

  });
