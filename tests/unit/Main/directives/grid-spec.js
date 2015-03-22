(function() {
  var unit = window.unit,
    directives = unit.directives;

  unit.Main.directives.testsWrapper('grid', function() {
    let gridElement, gridScope, grid;
    beforeEach(function() {
      gridElement = directives.getCompileElementFromTagName('grid');
      gridScope = gridElement.isolateScope(),
        grid = gridScope.grid;
    });

    unit.directives.assertThatElementDirectiveIsTransformed('grid');
    unit.it("Generates nxn (n=size) cells", function() {
      let cellsNumber = gridElement.find('td').length,
        gridSize = grid.data.size;

      expect(gridSize * gridSize).to.equal(cellsNumber);
    });

    unit.it("When a 'grid' event is broadcasted, it calls the method it gets", function() {
      grid.foo = sinon.spy();
      gridScope.$emit('grid', ['foo']);
      expect(grid.foo).to.have.been.called;
    });
  });
})();
