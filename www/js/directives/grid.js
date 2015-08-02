class Grid {
  constructor(clock) {
    this.clock = clock;
  }
  generate(configuration) {
    this.clock.start();
    this.rows = [];
    _.each(_.range(0, configuration.game.rows), (i) => {
      this.rows[i] = {
        cols: []
      };
      _.each(_.range(0, configuration.game.cols), (j) => this.rows[i].cols[j] = 'foo');
    });
  }
}

var grid = ['configuration', 'clock', function(configuration, clock) {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/grid.html',
    scope: {},
    controller: function($scope) {
      $scope.$on('grid-generate', function() {
        var grid = new Grid(clock);
        grid.generate(configuration);
        $scope.grid = grid;
      });
    }
  };
}];


export default ['grid', grid];
