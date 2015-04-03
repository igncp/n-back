(function() {

  window.unit.Main.helpers = {};

  var unit = window.unit,
    helpers = unit.Main.helpers;

  helpers.testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'helpers');

})();
