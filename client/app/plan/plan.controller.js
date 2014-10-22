'use strict';

angular.module('cdreamApp')
  .controller('PlanCtrl', function ($http, $scope, loginService, notificationService, utilService, markdownPro) {
    loginService.getCookieData($scope, true);
    $scope.softVersion = loginService.getSoftwareVersion();

    $scope.eventSource = {
      url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
      className: 'gcal-event',           // an option!
      currentTimezone: 'America/Chicago' // an option!
    };
  });
