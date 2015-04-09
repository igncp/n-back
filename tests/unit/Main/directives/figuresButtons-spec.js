(function() {
  var unit = window.unit;

  unit.Main.directives.testsWrapper('figuresButtons', function() {
    unit.directives.assertThatElementDirectiveIsTransformed('figures-buttons');

    unit.describe("scope", function() {
      unit.describe("figuresButtons", function() {
        var scope, figuresButtons, configuration;

        beforeEach(function() {
          scope = unit.directives.getScopeFromDirectiveTagName('figures-buttons');
          figuresButtons = scope.figuresButtons;
          configuration = unit.injectVars(['configuration']).configuration;
        });
        unit.describe("constructor()", function() {
          unit.it("has expected properties", function() {
            expect(figuresButtons.generated).to.equal(false);
            expect(figuresButtons.buttons).to.equal(null);
          });
        });
        unit.describe("generate()", function() {
          unit.it("generates expected buttons if grid size is greater than 1", function() {
            figuresButtons.generate();
            expect(figuresButtons.generated).to.equal(true);
            expect(configuration.grid.size).to.be.above(1);
            unit.expectArrayToContainObjectsWithKeyValue(figuresButtons.buttons, [['type', 'position'], ['type', 'letters']]);
            unit.expectArrayToContainObjectsWithKeyValue(figuresButtons.buttons, [['name', 'Position'], ['name', 'Letter']]);
          });
        });
        unit.describe("unset()", function() {
          unit.it("destroys buttons", function() {
            figuresButtons.unset();
            expect(figuresButtons.generated).to.equal(false);
            expect(figuresButtons.buttons).to.equal(null);
          });
        });
      });
    });
  });
})();
