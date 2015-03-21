(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('gridFactory', function() {
    let gridModel;
    beforeEach(function() {
      let gridElement = unit.getCompileElement(unit.gridMarkup),
        gridScope = gridElement.isolateScope();

      gridModel = gridScope.grid;
    });
  });
})();
