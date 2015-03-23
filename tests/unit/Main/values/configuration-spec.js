(function() {
  var unit = window.unit,
    testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'values');

  testsWrapper('configuration', function() {
    let configuration, originalFigures;
    beforeEach(function() {
      var wrapper = unit.injectVars(['configuration', 'originalFigures']);
      configuration = wrapper.configuration;
      originalFigures = wrapper.originalFigures;
    });

    unit.it('is defined and has defaults', function() {
      expect(configuration).not.to.equal(undefined);
      expect(configuration.nBack).to.equal(2);
      expect(configuration.grid.size).to.equal(3);
      expect(configuration.currentFigures).to.eql(['letters']);
      expect(configuration.figures).to.eql(originalFigures);
    });
  });
})();
