'use strict';

angular.module('cdreamApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/helper/icon', {
                templateUrl: 'app/helper/helperIcon.html',
                controller: 'HelperIconCtrl'
            });
    });
