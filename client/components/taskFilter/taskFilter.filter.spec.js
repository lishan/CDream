'use strict';

describe('Filter: taskFilter', function () {

  // load the filter's module
  beforeEach(module('cdreamApp'));

  // initialize a new instance of the filter before each test
  var taskFilter;
  beforeEach(inject(function ($filter) {
    taskFilter = $filter('taskFilter');
  }));

  it('should return the input prefixed with "taskFilter filter:"', function () {
    var text = 'angularjs';
    expect(taskFilter(text)).toBe('taskFilter filter: ' + text);
  });

});
