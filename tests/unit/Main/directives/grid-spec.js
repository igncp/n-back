(function() {
  var unit = window.unit,
    directives = unit.directives;

  unit.Main.directives.testsWrapper('grid', function() {
    var gridElement, gridScope, configurationGrid, grid;
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
            unit.expectMatrixIsSquareAndOfSize(grid.cells, configurationGrid.size);
          });

          unit.it("generates NxN (N=size) cells", function() {
            var cellsNumber = gridElement.find('td').length,
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
