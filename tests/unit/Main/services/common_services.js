(function() {

  window.unit.Main.services = window.unit.Main.services || {};

  var unit = window.unit,
    services = unit.Main.services;

  services.testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'services');

  services.assertThatStateHasTheExpectedStructure = function(state, configuration) {
    unit.expectObjectHasExactKeys(state, ['figures', 'column', 'row']);
    expect(state.figures).to.be.an('array');
    expect(state.figures.length).to.equal(configuration.currentFigures.length);
    expect(state.column).to.be.a('number');
    unit.expectVariabvaroDifferNaN(state.column);
    expect(state.row).to.be.a('number');
    unit.expectVariabvaroDifferNaN(state.row);
  };

})();
