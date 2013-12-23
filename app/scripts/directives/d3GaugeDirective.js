'use strict';
/* global D3Gauge */
angular.module('d3GaugeDirective', [])
    .directive('d3Gauge', function () {
      return {
        restrict: 'AE',
        scope: {
          id: '@',
          width: '=',
          height: '=',
          minValue: '=',
          maxValue: '=',
          startColor: '@',
          endColor: '@',
          value: '=',
          sections: '=',
          border: '='
        },
        template: '<div id={{id}}-d3-gauge class="d3-gauge"></div>',
        link: function (scope) {
          var config = {
            id: '#' + scope.id,
            width: scope.width,
            height: scope.height,
            minValue: scope.minValue,
            maxValue: scope.maxValue,
            colorStart: scope.startColor,
            colorEnd: scope.endColor,
            inputSections: scope.sections,
            border: scope.border === true ? true : false
          };
          var gauge = new D3Gauge(config, parseInt(scope.value));

          scope.$watch('value', function (updatedValue) {
            gauge.updateValue(updatedValue);
          });
        }
      };
    });


