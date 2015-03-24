(function() {
  var unit = window.unit,
    directives = unit.directives;

  unit.Main.directives.testsWrapper('grid', function() {
    let gridElement, gridScope, configurationGrid, grid;
    beforeEach(function() {
      configurationGrid = unit.injectVars(['configuration']).configuration.grid;
      gridElement = directives.getCompileElementFromTagName('grid');
      gridScope = gridElement.isolateScope();
      grid = gridScope.grid;
    });

    unit.directives.assertThatElementDirectiveIsTransformed('grid');

    unit.it("has a NxN cells variable", function() {
      expect(grid.cells.length).to.equal(configurationGrid.size);
      expect(grid.cells[0].length).to.equal(configurationGrid.size);
    });

    unit.it("Generates nxn (n=size) cells", function() {
      let cellsNumber = gridElement.find('td').length,
        gridSize = configurationGrid.size;

      expect(gridSize * gridSize).to.equal(cellsNumber);
    });

    unit.it("When a 'grid' event is broadcasted, it calls the method it gets", function() {
      grid.foo = sinon.spy();
      gridScope.$broadcast('grid', ['foo']);
      expect(grid.foo).to.have.been.called;
    });
  });
})();
