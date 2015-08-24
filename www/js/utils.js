var utils = {};

utils.loopWithApp = function(arr, method) {
  return function(app) {
    R.forEach((arrItem) => app[method].apply({}, arrItem))(arr);
  };
};

utils.generateDefaultApi = function(Clss, injectionDependenciesArgs) {
  injectionDependenciesArgs = injectionDependenciesArgs || [];
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

utils.each = R.addIndex(R.forEach);
utils.map = R.addIndex(R.map);

utils.mapToObject = R.pipe(utils.map, R.fromPairs);

utils.exposeObjectsApi = function(obj, apiMethods) {
  return utils.mapToObject((apiMethod) => {
    return [apiMethod, R.bind(obj[apiMethod])(obj)];
  })(apiMethods);
};

utils.scopeEmitObjectsApi = function(scope, msg, obj, apiMethods) {
  scope.$emit(msg, utils.exposeObjectsApi(obj, apiMethods));
};

utils.getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

utils.pipeCurried2 = R.curryN(2, R.pipe);

utils.getRandomItemOfArray = (arr) => {
  var arrIndex = utils.getRandomInt(0, arr.length);
  if (arrIndex === arr.length) arrIndex -= 1;
  return arr[arrIndex];
};

utils.NOOP = function() {};


export default utils;
