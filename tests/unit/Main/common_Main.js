(function() {

  window.unit = window.unit || {};
  var unit = window.unit;
  unit.Main = {};

  unit.Main.testsWrapper = function(cb) {
    describe("Main", function() {
      beforeEach(function() {
        module('Main');
        module('templates');
      });

      cb();
    });
  };

})();
