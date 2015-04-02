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

    unit.describe("gridScope", function() {
      unit.describe("$broadcast()", function() {
        unit.it("When a 'grid' event is broadcasted, it calls the method it gets", function() {
          grid.foo = sinon.spy();
          gridScope.$broadcast('grid', ['foo']);
          expect(grid.foo).to.have.been.called;
        });
      });

      unit.describe("grid", function() {
        unit.directives.assertThatElementDirectiveIsTransformed('grid');
        
        unit.describe("constructor()", function() {
          unit.it("has a NxN cells variable", function() {
            expect(grid.cells.length).to.equal(configurationGrid.size);
            expect(grid.cells[0].length).to.equal(configurationGrid.size);
          });

          unit.it("generates nxn (n=size) cells", function() {
            let cellsNumber = gridElement.find('td').length,
              gridSize = configurationGrid.size;

            expect(gridSize * gridSize).to.equal(cellsNumber);
          });
        });

        unit.describe("fillCellsWithState()", function() {
          unit.it("sets the cells correctly", function() {
            grid.fillCellsWithState(unit.fixtures.state);
            expect(grid.cells).to.eql(unit.fixtures.state3x3Cells);
          });
        });

        unit.describe("stop()", function() {
          unit.it("clears the grid value", function() {
            grid.fillCellsWithState(unit.fixtures.state);
            grid.stop();
            expect(grid.cells).to.eql(unit.fixtures.null3x3Cells);
          });
        });
      });
    });
  });
})();
