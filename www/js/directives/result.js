import utils from '../utils';

class Result {
  constructor(scope) {
    this.scope = scope;
  }
  fillAndShow(resultData) {
    var result = this;
    result.scope.showed = true;
    result.scope.data = resultData;
    result.scope.data.dataKeys = R.keys(result.scope.data.data);
    console.log("result.scope.data", result.scope.data);
  }
  hide() {
    var result = this;
    result.scope.showed = false;
  }
}

var result = ['configuration', function(configuration) {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/result.html',
    link: function(scope) {
      scope.gameConfiguration = configuration.game;
      scope.result = new Result(scope, configuration);
      utils.scopeEmitObjectsApi(scope, 'result-available', scope.result, [
        'fillAndShow', 'hide'
      ]);
    }
  };
}];


export default ['result', result];
