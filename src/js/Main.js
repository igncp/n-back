(function() {
  var Helpers = angular.module('Helpers', []);

  Helpers.factory('Helpers', function() {
    return {};
  });

  var Main = angular.module("Main", ['Helpers']);

  Main.controller('Main', function() {});

  (function() {
    let originalFigures = {
      letters: ['A', 'B', 'C', 'D'],
      colors: ['#CCC', '#F00', '#0F0', '#00F']
    };
    Main.constant('originalFigures', originalFigures);
    Main.value('configuration', {
      nBack: 2,
      sessionTime: 120,
      figures: angular.copy(originalFigures),
      currentFigures: ['letters'],
      grid: {
        size: 3
      }
    });
  })();

  Main.service('MainHelpers', function() {
    return {
      getNxNNullCells: function(size) {
        let cells = [];
        for (var i = size - 1; i >= 0; i--) {
          cells[i] = [];
          for (var j = size - 1; j >= 0; j--) {
            cells[i][j] = null;
          }
        }
        return cells;
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

  Main.service('gameData', function(MainHelpers, configuration) {
    class GameData {
      constructor() {
        let gameData = this;
        gameData.size = configuration.grid.size;
        gameData.figure = configuration.grid.figure;
        gameData.historyOfStates = {};
      }
      createNewState() {
        let gameData = this,
          figures,
          randomFigures = configuration.currentFigures.map(function(figureType) {
            figures = configuration.figures[figureType];
            return figures[Math.floor(Math.random() * figures.length)];
          }),
          randomRow = Math.floor(Math.random() * gameData.size),
          randomColumn = Math.floor(Math.random() * gameData.size),
          state;

        state = {
          figures: randomFigures,
          row: randomRow,
          column: randomColumn
        };

        return state;
      }
    }

    return new GameData();
  });

  Main.directive("grid", function(MainHelpers, gameData) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "directives/grid.html",
      link: function(scope) {
        class Grid {
          constructor() {
            let grid = this;
            grid.data = gameData;
            grid.generateNullCells();

            scope.$on('grid', function(event, broadcastedData) {
              grid[broadcastedData[0]](broadcastedData);
            });
          }
          generateNullCells() {
            let grid = this,
              size = grid.data.size;

            grid.cells = MainHelpers.getNxNNullCells(size);
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
                panel.clockTick();
              });
              panelEl.bind('clockStop', function() {
                panel.stop();
              });
            }
            clockTick() {
              scope.$broadcast('grid', ['clockTick']);
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
