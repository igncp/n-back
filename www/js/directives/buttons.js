import utils from '../utils';
import {composeWithEventEmitter} from '../eventEmitter';

class Buttons {
  constructor() {
    this.statusMap = {};
  }
  markWithResult(buttonName, resultIsSuccess) {
    this.statusMap[buttonName] = resultIsSuccess ? 'status-success' : 'status-failure';
  }
  unmarkAll() {
    this.statusMap = {};
  }

}
composeWithEventEmitter(Buttons);


var buttons = [function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/buttons.html',
    scope: {
      buttonsShowed: '=',
      buttonsDatas: '=',
    },
    link: function(scope) {
      scope.buttons = new Buttons();
      utils.scopeEmitObjectsApi(scope, 'buttons-available', scope.buttons, [
        'listen', 'markWithResult', 'unmarkAll'
      ]);
    }
  };
}];


export default ['buttons', buttons];
