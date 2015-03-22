(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('gridData instance of the GridData service', function() {
    let gridData, configurationGrid;
    beforeEach(function() {
      let GridData = unit.injectVars(['GridData']).GridData;

      gridData = new GridData();
      configurationGrid = unit.injectVars(['configuration']).configuration.grid;
    });

    it("has required properties", function() {
      expect(gridData.size).to.equal(configurationGrid.size);
      expect(gridData.figure).to.equal(configurationGrid.figure);
    });
    
    it("has NxN cells", function() {
      expect(gridData.cells.length).to.equal(configurationGrid.size);
      expect(gridData.cells[0].length).to.equal(configurationGrid.size);
    });
  });
})();
