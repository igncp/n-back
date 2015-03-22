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

  Main.service("ClockService", function(configuration) {
    let tickEvent = document.createEvent('Event');
    tickEvent.initEvent('clockTick', true, true);

    class Clock {
      constructor(elementAttachedTo) {
        let clock = this;
        clock.currentTime = 0;
        clock.finalTime = configuration.sessionTime;
        clock.elementAttachedTo = elementAttachedTo;
      }
      start() {
        let clock = this;
        clock.intervalId = setInterval(function() {
          clock.currentTime += 1;
          clock.elementAttachedTo.dispatchEvent(tickEvent);
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

    return Clock;
  });

  Main.service('GridData', function(configuration) {
    class GridData {
      constructor() {
        let gridData = this;
        gridData.size = configuration.grid.size;
        gridData.figure = configuration.grid.figure;
        gridData.generateNullCells();
      }
      generateNullCells() {
        let gridData = this,
          size = gridData.size;

        gridData.cells = [];
        for (var i = size - 1; i >= 0; i--) {
          gridData.cells[i] = [];
          for (var j = size - 1; j >= 0; j--) {
            gridData.cells[i][j] = null;
          }
        }
      }
    }

    return GridData;
  });

  Main.directive("grid", function(GridData) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "directives/grid.html",
      link: function(scope) {
        class Grid {
          constructor() {
            let grid = this;
            grid.data = new GridData();
            
            scope.$on('grid', function(event, broadcastedData) {
              grid[broadcastedData[0]](broadcastedData);
            });
          }
          start() {
            return null;
          }
        }

        scope.grid = new Grid();
      }
    };
  });

  Main.directive("gamePanel", function(configuration, ClockService) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "directives/gamePanel.html",
      link: {
        post: function(scope, panelEl) {
          class GamePanel {
            constructor() {
              let panel = this;

              panel.configuration = configuration;
              panel.clock = new ClockService(panelEl);
            }
            start() {
              let panel = this;
              scope.$broadcast('grid', ['start']);
              panel.clock.start();
              panelEl.bind('clockTick', function() {
                return null;
              });
              panelEl.bind('clockStop', function() {
                return null;
              });
            }
            stop() {
              let panel = this;
              
              scope.$broadcast('grid', ['stop']);
              panel.clock.stop();
            }
          }

          scope.gamePanel = new GamePanel();
        }
      }
    };
  });
})();
