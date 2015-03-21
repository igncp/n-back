(function() {
  var Main = angular.module("Main", []);

  Main.controller('Main', function() {
    
  });

  Main.factory("configuration", function() {
    return {
      nBack: 2,
      sessionTime: 120,
      grid: {
        size: 3,
        figures: 'letters'
      }
    };
  });

  Main.factory("gridFactory", function(GridData) {
    return {
      link: function(scope) {
        scope.gridData = new GridData();
      }
    };
  });

  Main.service("clockService", function(configuration) {
    class Clock {
      constructor(intervalFn) {
        this.currentTime = 0;
        this.finalTime = configuration.sessionTime;
        this.intervalFn = intervalFn;
      }
      start() {
        let clock = this;
        clock.intervalId = setInterval(function() {
          clock.currentTime += 1;
          if (clock.intervalFn) clock.intervalFn(clock);
          if (clock.currentTime === clock.finalTime) {
            clock.stop();
          }
        }, 1000);
      }
      stop() {
        let clock = this;
        if (typeof(clock.intervalId) === 'number') {
          clearInterval(clock.intervalId);
        }
        clock.currentTime = 0;
      }
    }

    return new Clock(configuration.intervalFn);
  });

  Main.service('GridData', function(configuration) {
    class GridData {
      constructor() {
        let gridData = this;
        gridData.data = {
          size: configuration.grid.size,
          figure: configuration.grid.figure
        };
        gridData.generateNullCells();
      }
      generateNullCells() {
        let gridData = this,
          size = gridData.data.size;
        gridData.data.cells = [];

        for (var i = size - 1; i >= 0; i--) {
          gridData.data.cells[i] = [];
          for (var j = size - 1; j >= 0; j--) {
            gridData.data.cells[i][j] = null;
          }
        }
      }
    }

    return GridData;
  });

  Main.directive("grid", function(gridFactory) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "directives/grid.html",
      link: gridFactory.link
    };
  });
})();
