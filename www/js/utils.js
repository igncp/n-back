var utils = {};

utils.loopWithApp = function(arr, method) {
  return function(app) {
    _.each(arr, (arrItem) => app[method].apply({}, arrItem));
  };
};

utils.emitMsgOnMethodFromScope = function(msg, method, scope) {
  scope[method] = () => scope.$emit(msg);
};

utils.generateDefaultApi = function(Clss, injectionDependenciesArgs) {
  injectionDependenciesArgs = injectionDependenciesArgs || [];
  console.log("injectionDependenciesArgs", injectionDependenciesArgs);
  var api = {
    registry: [],
    create: function() {
      // http://stackoverflow.com/a/6062379/3244654
      var newInstance = Object.create(Clss.prototype);
      Clss.apply(newInstance, injectionDependenciesArgs);
      api.registry.push(newInstance);
      return newInstance;
    }
  };

  return api;
};

utils.generateDefaultApiFn = function(Clss, injectionDependencies) {
  var result = injectionDependencies || [];
  result.push(function() {
    return utils.generateDefaultApi(Clss, arguments);
  });
  return result;
};

utils.NOOP = function() {};


export default utils;
