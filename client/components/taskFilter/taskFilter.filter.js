'use strict';

angular.module('cdreamApp')
  .filter('taskFilter', function () {
    return function (task) {
      console.log(task.dueTime);
      return task.name + "(" + task._dream.name + ")";
    };
  });
