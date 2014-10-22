'use strict';

angular.module('cdreamApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'jlareau.pnotify',
  'cfp.hotkeys',
  'markdown.provider',
  'ui.calendar'
])
  .config(function ($routeProvider, $locationProvider, notificationServiceProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    notificationServiceProvider.setDefaults({
      history: false,
      delay: 2000,
      closer: true,
      closer_hover: true
    });
    notificationServiceProvider.setStack('bottom_right', 'stack-bottomright', {
      dir1: 'up',
      dir2: 'left',
      firstpos1: 25,
      firstpos2: 25
    });
    notificationServiceProvider.setDefaultStack('bottom_right');
  });
