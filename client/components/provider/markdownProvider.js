(function () {

  'use strict';

  angular.module('markdown.provider', []).provider('markdownPro', function () {
    this.includeCheatSheet = true;

    this.$get = function ($rootElement, $rootScope, $compile, $window, $document) {
      function changeHtml(str) {
        if (str === undefined) {
          return "";
        }
        if (typeof markdown == 'object') {
          var message = markdown.toHTML(str);
          return message;
        }
      }

      var publicApi = {
        changeHtml: changeHtml
      };

      return publicApi;
    }
  }).run(function (markdownPro) {
  });
})();
