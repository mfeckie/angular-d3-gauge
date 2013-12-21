'use strict';
/*global D3Gauge:false */

describe('D3 gauges', function () {
  describe('Configuration', function () {
    var d, config, value, sections;
    beforeEach(function () {
      config = {id: '#gauge'};
      value = 10;
      sections = [ [0, 5], [5, 10], [10, 15], [15, 20], [20, 25], [25, 30], [30, 35], [35, 40] ];
      d = new D3Gauge(config, value, sections);
    });

    it('Returns version on creation', function () {
      expect(d.version).toBeDefined();
    });

  });
});