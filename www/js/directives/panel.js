class Panel {}

var panel = [function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/panel.html',
    scope: {},
    link: function(scope, element, attribute, controllers) {
      scope.$on('buttons-start-clicked', function() {
        scope.$broadcast('grid-generate');
      });
    }
  };
}];


export default ['panel', panel];
