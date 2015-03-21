(function() {
  var unit = window.unit;

  unit.Main.testsWrapper(function() {
    describe('directives', function() {
      describe('grid', function() {
        it('uses gridFactory.link as link function', function() {
          let wrapper = unit.injectVars(['gridFactory']),
            spy = sinon.spy(),
            html;

          wrapper.gridFactory.link = spy;
          html = unit.getCompileHTML(unit.gridMarkup);
          expect(spy.called).to.equal(true);
        });

        it("Generates nxn (n=size) cells", function() {
          let gridElement = unit.getCompileElement(unit.gridMarkup),
            cellsNumber = gridElement.find('td').length,
            gridScope = gridElement.isolateScope(),
            gridSize = gridScope.gridData.data.size;

          expect(gridSize * gridSize).to.equal(cellsNumber);
        });
      });
    });
  });
})();
