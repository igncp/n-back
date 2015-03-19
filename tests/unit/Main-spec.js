
(function() {
  var unit = window.unit;

  describe("Main", function() {
    beforeEach(function() {
      module('Main');
    });

    describe('services', function() {
      describe('configuration', function() {
        var vConf;
        beforeEach(function() {
          vConf = unit.injectVars(['configuration']);
        });

        it('isnt undefined', function() {
          expect(vConf.configuration).not.to.equal(undefined);
        });
        it('has defaults', function() {
          expect(vConf.configuration.nBack).to.equal(2);
        });
      });
    });
    describe('directives', function() {
      describe('screen', function() {
        it('exists and gets transformed', function() {
          var html = unit.getCompileHTML('<screen></screen>');

          expect(html).not.to.equal(undefined);
          expect(html).not.to.equal('<screen class="ng-scope"></screen>');
        });
      });
    });
  });
})();
