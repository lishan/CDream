'use strict';

angular.module('cdreamApp')
  .directive('markdown', function () {
    return {
      templateUrl: 'app/markdown/markdown.html',
      restrict: 'EA',
      scope:{
        model: '=ngModel'
      },
      link: function (scope, element, attrs) {
        element.markdown();
      }
    };
  });
