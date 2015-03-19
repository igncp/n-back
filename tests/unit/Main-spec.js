(function() {
  var unit = window.unit;

  describe("Main", function() {
    beforeEach(function() {
      module('Main');
      module('templates');
    });

    describe('services', function() {
      describe('configuration', function() {
        let vConf;
        beforeEach(function() {
          vConf = unit.injectVars(['configuration']);
        });

        it('is defined and has defaults', function() {
          expect(vConf.configuration).not.to.equal(undefined);
          expect(vConf.configuration.nBack).to.equal(2);
          expect(vConf.configuration.sessionTime).to.equal(120);
        });
      });
    });

    describe('directives', function() {
      describe('screen', function() {
        it('exists and gets transformed', function() {
          let html = unit.getCompileHTML('<screen></screen>');

          expect(html).not.to.equal(undefined);
          expect(html).not.to.equal('<screen class="ng-scope"></screen>');
        });

        it('uses screenService as link function', function() {
          let wrapper = unit.injectVars(['screenService']),
            spy = sinon.spy(),
            html;
            
          wrapper.screenService.link = spy;
          html = unit.getCompileHTML('<screen></screen>');
          expect(spy.called).to.equal(true);
        });
      });
    });
  });
})();
