'use strict';

describe('Controller: DreamCtrl', function () {

  // load the controller's module
  beforeEach(module('cdreamApp'));

  var DreamCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DreamCtrl = $controller('DreamCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
