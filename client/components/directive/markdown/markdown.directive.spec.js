'use strict';

describe('Directive: markdown', function () {

  // load the directive's module and view
  beforeEach(module('cdreamApp'));
  beforeEach(module('app/markdown/markdown.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<markdown></markdown>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
