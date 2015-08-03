class Panel {}

var panel = ['games', function(games) {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/panel.html',
    scope: {},
    controller: function($scope) {
      $scope.game = games.create();
      console.log("$scope.game", $scope.game);
      $scope.$on('buttons-start-clicked', function() {
        $scope.$broadcast('grid-generate');
      });
    }
  };
}];


export default ['panel', panel];
