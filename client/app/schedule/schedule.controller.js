'use strict';

angular.module('cdreamApp')
  .controller('ScheduleCtrl', function ($http, $scope, loginService, notificationService, utilService, markdownPro) {
    loginService.getCookieData($scope, true);
    $scope.softVersion = loginService.getSoftwareVersion();
    $scope.choose = function (obj) {
      return obj === "schedule";
    };

    $scope.parseHtml = function (str) {
      return markdownPro.changeHtml(str);
    };

    $scope.getProgress = function (dream) {
      if (dream.progress !== null && dream.progress !== undefined) {
        return dream.progress;
      }
      if (dream.tasks === null || dream.tasks.length === 0) {
        dream.progress = 0;
        return 0;
      }
      var all = dream.tasks.length;
      var counter = 0;
      for (var index in dream.tasks) {
        if (dream.tasks[index].finished) {
          counter++;
        }
      }
      dream.progress = counter * 100 / all;
      return counter * 100 / all;
    };

    $scope.checkTime = function (dueTime, pointer) {
      var due = new Date(dueTime).getTime() + pointer * 24 * 3600 * 1000;
      return new Date(due).toString("yyyy-MM-dd") === new Date().toString("yyyy-MM-dd");
    };

    $scope.checkDue = function (dueTime) {
      var now = new Date(new Date().toString("yyyy-MM-dd"));
      return new Date(dueTime).getTime() < now.getTime() && new Date(dueTime).toString("yyyy-MM-dd") !== new Date().toString("yyyy-MM-dd");
    };
  });
