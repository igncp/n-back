(function() {
  var unit = window.unit,
    services = unit.Main.services;

  services.testsWrapper('gameData', function() {
    var gameData, configuration, originalFigures;
    beforeEach(function() {
      var wrapper = unit.injectVars(['gameData', 'originalFigures', 'configuration']);
      gameData = wrapper.gameData;
      originalFigures = wrapper.originalFigures;
      configuration = wrapper.configuration;
    });

    unit.it("has required properties", function() {
      expect(gameData.historyOfStates).to.be.an('array');
      expect(gameData.currentStateIndex).to.be.a('number');
    });

    unit.it("can create a new state with the expected structure", function() {
      var state = gameData.createNewState();

      services.assertThatStateHasTheExpectedStructure(state, configuration);
    });

    unit.describe('clearHistoryOfStates', function() {
      unit.it("clears historyOfStates", function() {
        gameData.historyOfStates = ['foo', 'bar'];
        gameData.clearHistoryOfStates();
        expect(gameData.historyOfStates).to.eql([]);
      });
    });

    unit.describe('generateANewHistoryOfStates', function() {
      unit.it("fills historyOfStates with well structured states", function() {
        gameData.generateANewHistoryOfStates();
        expect(gameData.historyOfStates.length).to.equal(gameData.sessionStatesNumber);
        if (gameData.historyOfStates.length > 0) {
          services.assertThatStateHasTheExpectedStructure(gameData.historyOfStates[0], configuration);
        }
      });
    });

    unit.describe("getNextState", function() {
      unit.it("returns the next state", function() {
        var state;

        expect(gameData.currentStateIndex).to.equal(-1);
        gameData.generateANewHistoryOfStates();
        state = gameData.getNextState();
        services.assertThatStateHasTheExpectedStructure(state, configuration);
        expect(gameData.currentStateIndex).to.equal(0);
      });
    });

  });
})();
