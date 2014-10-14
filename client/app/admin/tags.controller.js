'use strict';

angular.module('cdreamApp')
    .controller('TagsCtrl', function ($scope, $http, socket, $cookies, $modal, loginService, utilService, notificationService, hotkeys) {
        loginService.getCookieData($scope);
        $scope.softVersion = loginService.getSoftwareVersion();
        $scope.choose = function (obj) {
            return obj === null || obj === undefined;
        };

        hotkeys.bindTo($scope)
            .add({
                combo: 'enter',
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function () {
                    $scope.add();
                }
            });

        $scope.remove = function (tag) {
            $http.post("/api/users/removeTag/" + $scope.loginUser._id, {tag: tag._id}).success(function () {
                $http.delete("/api/tags/" + tag._id);
                loginService.getCookieData($scope);
                notificationService.success("删除" + tag.name + "成功");
            }).error(function () {
                notificationService.error("删除" + tag.name + "失败");
            });
        };

        $scope.add = function () {
            var split = $scope.tag.split(":");
            $scope.tag = '';
            $http.post("/api/tags", {_user: $scope.loginUser._id, name: split[0], color: split[1], icon: split[2], info: split[3]}).success(function (tag) {
                $http.post("/api/users/addTag/" + $scope.loginUser._id, {tag: tag._id});
                loginService.getCookieData($scope);
                notificationService.success("创建 " + split[0] + " 成功");
            }).error(function (e) {
                notificationService.error("创建 " + split[0] + "失败");
            });
        }
    });


