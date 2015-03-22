(function() {

  window.unit.Main.directives = window.unit.Main.directives || {};

  var unit = window.unit,
    directives = unit.Main.directives;

  directives.testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'directives');

})();
