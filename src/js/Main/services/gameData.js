(function() {
  var Main = window.NBack.Main;
  
  Main.service('gameData', function(MainHelpers, configuration) {
    class GameData {
      constructor() {
        let gameData = this;
        gameData.historyOfStates = [];
        gameData.currentStateIndex = -1;
        gameData.sessionStatesNumber = Math.ceil(configuration.sessionTime / (configuration.stateTime / 1000));
      }

      createNewState() {
        let figures,
          randomFigures = configuration.currentFigures.map(function(figureType) {
            figures = configuration.figures[figureType];
            return figures[Math.floor(Math.random() * figures.length)];
          }),
          randomRow = Math.floor(Math.random() * configuration.grid.size),
          randomColumn = Math.floor(Math.random() * configuration.grid.size),
          state;

        state = {
          figures: randomFigures,
          row: randomRow,
          column: randomColumn
        };

        return state;
      }

      clearHistoryOfStates() {
        let gameData = this;
        gameData.historyOfStates = [];
      }

      generateANewHistoryOfStates() {
        let gameData = this,
          newState;
        gameData.clearHistoryOfStates();
        for (var i = gameData.sessionStatesNumber - 1; i >= 0; i--) {
          newState = gameData.createNewState();
          gameData.historyOfStates.push(newState);
        }
      }

      getNextState() {
        let gameData = this;
        gameData.currentStateIndex += 1;
        if (gameData.currentStateIndex < gameData.historyOfStates.length - 1) {
          return gameData.historyOfStates[gameData.currentStateIndex];
        } else {
          return null;
        }
      }
    }

    return new GameData();
  });
})();
