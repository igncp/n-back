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
        unit.describe("generate", function() {
          unit.it("generates buttons", function() {
            figuresButtons.generate();
            expect(figuresButtons.generated).to.equal(true);
            unit.expectArraysHaveTheSameLength(figuresButtons.buttons, configuration.currentFigures);
          });
        });
        unit.describe("unset", function() {
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
