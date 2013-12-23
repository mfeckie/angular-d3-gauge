'use strict';

describe('d3GaugesDirective', function () {
  var $compile, $rootScope, testHTML, element;

  beforeEach(module('angularD3GaugesApp'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    testHTML = '<div d3-gauge id="test-div" width="100" height="50" min-value="0" max-value="100" start-color="green" end-color="red" value="testValue" border="false"></div>';
    element = $compile(testHTML)($rootScope);
  }));

  it('creates a div when the correct HTML attribute is seen', function () {
    $rootScope.$digest();
    expect(element.html()).toContain('<div id="test-div-d3-gauge" class="d3-gauge">');
  });

  it('creates isolated scope with variables from the HTML', function () {
    $rootScope.$digest();
    var isolatedScope = element.isolateScope();
    expect(isolatedScope.width).toEqual(100);
    expect(isolatedScope.height).toEqual(50);
    expect(isolatedScope.minValue).toEqual(0);
    expect(isolatedScope.maxValue).toEqual(100);
    expect(isolatedScope.startColor).toEqual('green');
    expect(isolatedScope.endColor).toEqual('red');
    expect(isolatedScope.border).toEqual(false);
  });

  it('updates when bound value changes', function () {
    $rootScope.testValue = 1;
    $rootScope.$digest();
    var isolatedScope = element.isolateScope();
    expect(isolatedScope.value).toEqual(1);
    $rootScope.testValue = 42;
    $rootScope.$digest();
    expect(isolatedScope.value).toEqual(42);
  });

  it('allows a bound sections value', function () {
    $rootScope.testSections = [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 40],
      [40, 50]
    ];
    testHTML = '<div d3-gauge id="test-div" width="100" height="50" min-value="0" max-value="100" start-color="green" end-color="red" value="testValue" sections="testSections"></div>';
    element = $compile(testHTML)($rootScope);
    $rootScope.$digest();
    var isolatedScope = element.isolateScope();
    expect(isolatedScope.sections).toEqual($rootScope.testSections);
  });


});