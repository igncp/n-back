import utils from '../utils';

class Grid {
  constructor() {}
  generate(configuration) {
    this.rows = [];
    R.forEach((i) => {
      this.rows[i] = {
        cols: []
      };
      R.forEach((j) => this.rows[i].cols[j] = null)(R.range(0, configuration.game.cols));
    })(R.range(0, configuration.game.rows));
  }
  clear() {
    this.rows = [];
  }
  clean() {
    R.forEach((row) => {
      utils.each((col, colIndex) => row.cols[colIndex] = null)(row.cols);
    })(this.rows);
  }
  applyState(state) {
    var values = state.values,
      figure;

    this.clean();
    if ('letter' in values) figure = values.letter;
    if ('position' in values) this.rows[values.position[0]].cols[values.position[1]] = figure;
  }
}

var grid = [function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/grid.html',
    scope: {},
    controller: function($scope) {
      $scope.grid = new Grid();

      utils.scopeEmitObjectsApi($scope, 'grid-available', $scope.grid, [
        'generate', 'applyState', 'clear'
      ]);
    }
  };
}];


export default ['grid', grid];
