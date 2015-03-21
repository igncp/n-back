(function() {

  window.unit = window.unit || {};
  window.unit.Main = window.unit.Main || {};
  window.unit.Main.services = window.unit.Main.services || {};

  var unit = window.unit,
    services = unit.Main.services;

  services.testsWrapper = function(suiteName, cb) {
    unit.Main.testsWrapper(function() {
      describe('services', function() {
        describe(suiteName, function() {
          cb();
        });
      });
    });
  };

})();
