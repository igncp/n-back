var Main = window.NBack.Main;

Main.directive('grid', function(MainHelpers, gameData, configuration) {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    templateUrl: 'directives/grid.html',
    link: function(scope) {
      let grid;

      class Grid {
        constructor() {
          grid = this;
          grid.data = gameData;
          grid.generateNullCells();

          MainHelpers.callMethodOnReceivedMessage('grid', scope, grid);
        }
        generateNullCells() {
          let size = configuration.grid.size;

          grid.cells = MainHelpers.getNxNNullCells(size);
        }
        start() {
          gameData.generateANewHistoryOfStates();
        }
        refreshState() {
          grid.setNextState();
        }
        stop() {
          gameData.clearHistoryOfStates();
          grid.generateNullCells();
        }
        setNextState() {
          let state = gameData.getNextState();

          grid.fillCellsWithState(state);
        }
        fillCellsWithState(state) {
          grid.generateNullCells();
          grid.cells[state.row][state.column] = state.figures[0];
        }
      }

      scope.grid = new Grid();
    }
  };
});
