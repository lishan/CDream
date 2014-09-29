'use strict';

angular.module('cdreamApp')
  .directive('markdown', function ($http, notificationService) {
    return {
      restrict: 'E',
      template: '<textarea data-provide="markdown" ng-model="model.info"></textarea>',
      scope: {
        model: '=ngModel'
      },
      link: function (scope, element, attrs) {
        element.find("textarea").markdown({
          onBlur: function (e) {
            $http.put('/api/dreams/' + scope.model._id, {info: scope.model.info}).success(function () {
              notificationService.success("保存" + scope.model.name + "成功");
            }).error(function () {
              notificationService.success("保存" + scope.model.name + "失败");
            });
          }
        });
      }
    };
  });
