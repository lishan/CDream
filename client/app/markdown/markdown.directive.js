'use strict';

angular.module('cdreamApp')
  .directive('markdown', function () {
    return {
      restrict: 'E',
      template: '<textarea data-provide="markdown">{{model.info}}</textarea>',
      scope:{
        model: '=ngModel'
      },
      link: function (scope, element, attrs) {
        element.find("textarea").markdown();
      }
    };
  });
