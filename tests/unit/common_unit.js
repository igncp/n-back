/* global chai: false, inject: false */

window.expect = chai.expect;

/**
 * window.unit is a namespace for common helpers in the unit tests scope
 */

window.unit = window.unit || {};
var unit = window.unit;

unit.noop = function() {};

unit.gridMarkup = '<grid></grid>';

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

unit.getCompileElement = function(html) {
  var wrapper, compilationElement;

  wrapper = unit.injectVars(['$compile', '$rootScope']);
  compilationElement = wrapper.$compile(html)(wrapper.$rootScope);
  wrapper.$rootScope.$digest();

  return compilationElement;
};

unit.getCompileHTML = function(html) {
  var element = unit.getCompileElement(html);

  return element[0].outerHTML;
};

unit.mockWindowSetInterval = function(mockCb, intervalId) {
  return unit.mockWindowFn('setInterval', function(cb) {
    if (mockCb) {
      mockCb();
    } else if (cb) {
      cb();
    }
    return intervalId || 0;
  });
};

unit.mockWindowFn = function(fnName, mockFn) {
  var nativeFn = window[fnName];

  mockFn = mockFn ? mockFn : unit.noop;

  window[fnName] = mockFn;

  return function() {
    window[fnName] = nativeFn;
  };
};
