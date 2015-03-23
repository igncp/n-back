/* global chai: false, inject: false */

(function() {
  window.expect = chai.expect;

  /**
   * window.unit is a namespace for common helpers in the unit tests scope
   */

  window.unit = {};
  var unit = window.unit;

  unit.noop = function() {};

  unit.describe = function(text, fn) {
    describe('> ' + text, fn);
  };

  unit.it = function(text, fn) {
    it('... it ' + text, fn);
  };

  unit.expectObjectHasExactKeys = function(obj, keys) {
    var objKeys = Object.keys(obj);

    expect(objKeys).to.have.members(keys);
  };

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

  unit.mockWindowFn = function(fnName, mockFn) {
    var nativeFn = window[fnName];

    mockFn = mockFn ? mockFn : unit.noop;

    window[fnName] = mockFn;

    return function() {
      window[fnName] = nativeFn;
    };
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

  unit.mockWindowSetIntervalCallingOwnCb = function() {
    return unit.mockWindowSetInterval(null, 0);
  };

  unit.beforeEachMockMockableFnAndRestoreAfter = function(mockableFn) {
    var restoreNative;
    beforeEach(function() {
      restoreNative = mockableFn();
    });

    afterEach(function() {
      restoreNative();
    });
  };

  unit.defaultTestWrapper = function(parentWrapper, topic) {
    return function(suiteName, suite) {
      parentWrapper(function() {
        unit.describe(topic, function() {
          unit.describe(suiteName, function() {
            suite();
          });
        });
      });
    };
  };

  unit.getHTMLMarkupFromTagName = function(tagName, attrs) {
    attrs = attrs || '';
    return '<' + tagName + ' ' + attrs + '></' + tagName + '>';
  };

  unit.gridMarkup = unit.getHTMLMarkupFromTagName('grid');
  unit.gamePanelMarkup = unit.getHTMLMarkupFromTagName('game-panel');
})();
