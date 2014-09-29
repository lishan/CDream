'use strict';

angular.module('cdreamApp')
  .service('utilService', function ($routeParams, notificationService) {
    this.timeConventor = function (time) {
      var minTime = (new Date() - new Date(time)) / 1000;
      if (minTime < 60) {
        return parseInt(minTime) + "秒前";
      }
      minTime /= 60;
      if (minTime < 60) {
        return parseInt(minTime) + "分钟前";
      }
      minTime /= 60;
      if (minTime < 24) {
        return parseInt(minTime) + "小时前";
      }
      minTime /= 24;
      if (minTime < 11) {
        return parseInt(minTime) + "天前";
      }
      return new Date(time).toString('yyyy-MM-dd');
    };
    this.pinesNotify = function(){
      if($routeParams.message !== '' && $routeParams.message !== undefined){
         notificationService.info($routeParams.message);
      }
    };
  });
