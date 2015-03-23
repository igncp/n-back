(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('gameData', function() {
    let gameData, configuration, originalFigures;
    beforeEach(function() {
      let wrapper = unit.injectVars(['gameData', 'originalFigures', 'configuration']);
      gameData = wrapper.gameData;
      originalFigures = wrapper.originalFigures;
      configuration = wrapper.configuration;
    });

    unit.it("has required properties", function() {
      expect(gameData.size).to.equal(configuration.grid.size);
      expect(gameData.figure).to.equal(configuration.grid.figure);
    });

    unit.it("can create a new state with the expected structure", function() {
      let state = gameData.createNewState();

      unit.expectObjectHasExactKeys(state, ['figures', 'column', 'row']);
      expect(state.figures).to.be.an('array');
      expect(state.figures.length).to.equal(configuration.currentFigures.length);
      expect(state.column).to.be.a('number');
      expect(state.row).to.be.a('number');
    });
  });
})();
