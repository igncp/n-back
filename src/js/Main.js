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
      stateTime: 1000,
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

        clock.elementAttachedTo = elementAttachedTo;
      }
      start() {
        let clock = this;

        if (clock.started === true) clock.stop();

        clock.finalTime = configuration.sessionTime;
        clock.currentTime = 0;
        clock.started = true;
        clock.intervalId = setInterval(function() {
          clock.currentTime += 1;
          clock.elementAttachedTo.dispatchEvent(tickEvent);
          if (clock.currentTime === clock.finalTime) {
            clock.stop();
          }
        }, configuration.sessionTime);
      }
      stop() {
        let clock = this;
        if (typeof(clock.intervalId) === 'number') {
          clearInterval(clock.intervalId);
        }
        clock.currentTime = 0;
        clock.started = false;
      }
    }

    return Clock;
  });

  Main.service('gameData', function(MainHelpers, configuration) {
    class GameData {
      constructor() {
        let gameData = this;
        gameData.historyOfStates = [];
        gameData.currentStateIndex = 0;
        gameData.sessionStatesNumber = Math.ceil(configuration.sessionTime / (configuration.stateTime / 1000));
      }

      createNewState() {
        let figures,
          randomFigures = configuration.currentFigures.map(function(figureType) {
            figures = configuration.figures[figureType];
            return figures[Math.floor(Math.random() * figures.length)];
          }),
          randomRow = Math.floor(Math.random() * configuration.grid.size),
          randomColumn = Math.floor(Math.random() * configuration.grid.size),
          state;

        state = {
          figures: randomFigures,
          row: randomRow,
          column: randomColumn
        };

        return state;
      }

      clearHistoryOfStates() {
        let gameData = this;
        gameData.historyOfStates = [];
      }

      generateANewHistoryOfStates() {
        let gameData = this,
          newState;
        gameData.clearHistoryOfStates();
        for (var i = gameData.sessionStatesNumber - 1; i >= 0; i--) {
          newState = gameData.createNewState();
          gameData.historyOfStates.push(newState);
        }
      }

      getNextState() {
        let gameData = this;
        gameData.currentStateIndex += 1;
        if (gameData.currentStateIndex < gameData.historyOfStates.length - 1) {
          return gameData.historyOfStates[gameData.currentStateIndex];
        } else {
          return null;
        }
      }
    }

    return new GameData();
  });

  Main.directive('grid', function(MainHelpers, gameData, configuration) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'directives/grid.html',
      link: function(scope) {
        class Grid {
          constructor() {
            let grid = this;
            grid.data = gameData;
            grid.generateNullCells();

            scope.$on('grid', function(event, broadcastedData) {
              let command = broadcastedData.shift(0);
              grid[command](broadcastedData);
            });
          }
          generateNullCells() {
            let grid = this,
              size = configuration.grid.size;

            grid.cells = MainHelpers.getNxNNullCells(size);
          }
          start() {
            gameData.generateANewHistoryOfStates();
          }
          refreshState() {
            let grid = this;
            grid.setNextState();
          }
          stop() {
            gameData.clearHistoryOfStates();
          }
          setNextState() {
            let grid = this,
              state = gameData.getNextState();

            grid.fillCellsWithState(state);
          }
          fillCellsWithState(state) {
            let grid = this;
            grid.generateNullCells();
            grid.cells[state.row][state.column] = state.figures[0];
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
              panel.clock = new ClockService(panelEl[0]);
            }
            start() {
              let panel = this;
              scope.$broadcast('grid', ['start']);
              panel.clock.start();
              panelEl.bind('clockTick', function(data) {
                panel.clockTick(data);
              });
              panelEl.bind('clockStop', function() {
                panel.stop();
              });
            }
            clockTick(data) {
              scope.$broadcast('grid', ['refreshState', data]);
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
