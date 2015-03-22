(function() {

  window.unit.Main.services = window.unit.Main.services || {};

  var unit = window.unit,
    services = unit.Main.services;

  services.testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'services');
  
})();
