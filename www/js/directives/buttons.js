import utils from '../utils'

var buttons = [function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/buttons.html',
    link: function(scope) {
      utils.emitMsgOnMethodFromScope('buttons-start-clicked', 'start', scope);
    }
  };
}];


export default ['buttons', buttons];