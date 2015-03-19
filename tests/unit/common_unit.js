/* global chai: false, inject: false */

var unit;

window.expect = chai.expect;

/**
 * window.unit is a namespace for common helpers in the unit tests scope
 */

window.unit = unit = {};


/**
 * Injects all the passed services into a returned object
 * @param  {Array} vars Array of the services strings
 * @return {Object} An object containing the injected services
 */

unit.injectVars = function(services) {
  var varsObj = {},
    injectionFunction = function($injector) {
      services.forEach(function(serviceName) {
        varsObj[serviceName] = $injector.get(serviceName);
      });
    };

  inject(injectionFunction);

  return varsObj;
};

unit.compile = function(html) {
  var wrapper, compilation;

  wrapper = unit.injectVars(['$compile', '$rootScope']);
  compilation = wrapper.$compile(html)(wrapper.$rootScope);
  wrapper.$rootScope.$digest();

  return compilation;
};

unit.getCompileHTML = function(html) {
  var element = unit.compile(html);

  return element[0].outerHTML;
};
