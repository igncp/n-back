var utils = {};

utils.loopWithApp = function(arr, method) {
  return function(app) {
    _.each(arr, (arrItem) => app[method].apply({}, arrItem));
  };
};

utils.emitMsgOnMethodFromScope = function(msg, method, scope) {
  scope[method] = ()=> scope.$emit(msg);
};


export default utils;
