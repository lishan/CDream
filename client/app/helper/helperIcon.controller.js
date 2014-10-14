'use strict';

angular.module('cdreamApp')
    .controller('HelperIconCtrl', function ($scope, loginService) {
        loginService.getCookieData($scope);
        $scope.softVersion = loginService.getSoftwareVersion();


    });
