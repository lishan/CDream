'use strict';

angular.module('cdreamApp')
  .directive('markdown', function ($http) {
    return {
      restrict: 'E',
      template: '<textarea data-provide="markdown" ng-model="model.info"></textarea>',
      scope:{
        model: '=ngModel'
      },
      link: function (scope, element, attrs) {
        element.find("textarea").markdown({
          onBlur: function(e) {
            console.log(scope.model);
            $http.put('/api/dreams/' + scope.model._id, {info : scope.model.info});
          }
        });
      }
    };
  });
