class Grid {
  constructor() {
  }
  generate(configuration) {
    this.rows = [];
    _.each(_.range(0, configuration.game.rows), (i) => {
      this.rows[i] = {
        cols: []
      };
      _.each(_.range(0, configuration.game.cols), (j) => this.rows[i].cols[j] = 'foo');
    });
  }
}

var grid = ['configuration', function(configuration) {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/grid.html',
    scope: {},
    controller: function($scope) {
      $scope.$on('grid-generate', ()=> {
        var grid = new Grid();
        grid.generate(configuration);
        $scope.grid = grid;
      });
    }
  };
}];


export default ['grid', grid];
