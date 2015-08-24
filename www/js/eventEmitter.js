export var createAnEventEmitter = function() {
  var constructor = function EventEmitter() {};

  composeWithEventEmitter(constructor);

  return new constructor();
};

export var composeWithEventEmitter = function(constructor) {
  var _subjects = [],
    createName = function(name) {
      return '$' + name;
    };

  constructor.prototype.emit = function(name, data) {
    var fnName = createName(name);
    _subjects[fnName] || (_subjects[fnName] = new Rx.Subject());
    _subjects[fnName].onNext(data);
  };

  constructor.prototype.listen = function(name, handler) {
    var fnName = createName(name);
    _subjects[fnName] || (_subjects[fnName] = new Rx.Subject());
    return _subjects[fnName].subscribe(handler);
  };

  constructor.prototype.listenAndApply = function(name, handler) {
    var instance = this;
    instance.listen(name, function() {
      instance.scope.$apply(() => handler.apply(instance, arguments));
    });
  };

  constructor.prototype.dispose = function() {
    var subjects = _subjects;
    for (var prop in subjects) {
      if ({}.hasOwnProperty.call(subjects, prop)) {
        subjects[prop].dispose();
      }
    }

    _subjects = {};
  };
};
