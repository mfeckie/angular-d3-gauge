'use strict';

angular.module('angularD3GaugesApp')
    .controller('demoCtrl', function ($scope) {
      $scope.demoValue = 50;
      $scope.demoSections = [
        [0, 10],
        [10, 20],
        [20, 30],
        [30, 40],
        [40, 50]
      ];
    });