(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('configuration', function() {
    let configuration;
    beforeEach(function() {
      configuration = unit.injectVars(['configuration']).configuration;
    });

    it('is defined and has defaults', function() {
      expect(configuration).not.to.equal(undefined);
      expect(configuration.nBack).to.equal(2);
      expect(configuration.grid.size).to.equal(3);
      expect(configuration.grid.figures).to.equal('letters');
    });
  });
})();
