import utils from '../utils';
import constants from '../constants';

var defaultButtonsNames = {
    start: 'Start',
    stop: 'Stop',
    restart: 'Restart'
  },
  _getButtonsDatas = ((defaultButtonsNms, gameConfig) => {
    var defaultButtons = utils.mapToObject((buttonKey) => [buttonKey, {
        name: defaultButtonsNms[buttonKey]
      }])(R.keys(defaultButtonsNms)),
      entitiesButtons = utils.mapToObject((entityKey) => [entityKey, gameConfig.availableEntities[entityKey]])(gameConfig.entities);

    return R.merge(defaultButtons, entitiesButtons);
  });

class Panel {
  constructor(scope, games, configuration) {
    var panel = this;

    panel.scope = scope;
    panel.games = games;
    panel.configuration = configuration;

    scope.showInfo = false;
    scope.buttonsDatas = _getButtonsDatas(defaultButtonsNames, configuration.game);
    scope.buttonsShowed = ['start'];

    panel.game = games.create();
    panel.game.scope = panel.scope;
    panel.setGameListeners();

    scope.$on('keypress', (msg, e) => panel.handleKeyPress(e.keyCode));
    scope.$on('result-available', (msg, resultApi) => panel.result = resultApi);
    scope.$on('grid-available', (msg, gridApi) => panel.grid = gridApi);
    scope.$on('buttons-available', (msg, buttonsApi) => {
      panel.buttons = buttonsApi;

      R.forEach((action) => {
        panel.buttons.listen(action, () => panel[action]());
      })(['start', 'stop', 'restart']);

      utils.each((entityKey) => {
        panel.buttons.listen(entityKey, () => {
          panel.handleEntityButtonClick(entityKey);
        });
      })(configuration.game.entities);
    });
  }
  handleEntityButtonClick(entityKey) {
    var panel = this,
      result = panel.game.setEntity(entityKey);

    panel.buttons.markWithResult(entityKey, result);
  }
  setGameListeners() {
    var panel = this;

    panel.game.listenAndApply('game-finish', () => panel.finish());
    panel.game.listenAndApply('state-change-after', (state) => {
      panel.updateInfoAndGrid(state);
    });
    panel.game.listenAndApply('state-change-before', () => {
      var failureEntities = panel.game.checkAndUnsetAllEntities();

      R.forEach(entityKey => {
        panel.buttons.markWithResult(entityKey, false);
      })(failureEntities);
      
      setTimeout(() => {
        panel.scope.$apply(() => panel.buttons.unmarkAll());
      }, 500);
    });
  }
  handleKeyPress(keyCode) {
    var panel = this;

    R.forEach((entityKey) => {
      var boundKey = panel.scope.buttonsDatas[entityKey].boundKey;
      if (keyCode === constants.KEYCODES[boundKey]) {
        panel.scope.$apply(() => {
          panel.handleEntityButtonClick(entityKey)
        });
      }
    })(panel.configuration.game.entities);
  }
  hideElementsOfRound() {
    var panel = this;

    panel.scope.showInfo = false;
    panel.grid.clear();
  }
  stop() {
    var panel = this;

    panel.hideElementsOfRound();
    panel.game.stop();
    panel.scope.buttonsShowed = ['start'];
  }
  finish() {
    var panel = this;

    panel.hideElementsOfRound();
    panel.result.fillAndShow(panel.game.result);
    panel.scope.buttonsShowed = ['restart'];
  }
  restart() {
    var panel = this;

    panel.start();
  }
  updateInfoAndGrid(state) {
    var panel = this;

    panel.scope.remainingStates = panel.game.getRemainingStates();
    panel.grid.applyState(state);
  }
  start() {
    var panel = this,
      firstState;

    panel.scope.showInfo = true;
    panel.grid.generate(panel.configuration);
    panel.result.hide();
    firstState = panel.game.start();
    panel.scope.buttonsShowed = ['stop'].concat(panel.configuration.game.entities);
    panel.updateInfoAndGrid(firstState);
  }
}

var panel = ['games', 'configuration', function(games, configuration) {
  return {
    restrict: 'E',
    templateUrl: 'templates/game/panel.html',
    scope: {},
    controller: function($scope) {
      $scope.panel = new Panel($scope, games, configuration);
    }
  };
}];

export default ['panel', panel];
