(function() {

  window.unit.Main.directives = window.unit.Main.directives || {};

  var unit = window.unit,
    directives = unit.Main.directives;

  directives.testsWrapper = unit.defaultTestWrapper(unit.Main.testsWrapper, 'directives');

  directives.expectBroadcastFirstAndSecondArgument = function(scope, reverseIndexCall, obj, method, firstValue, secondValue) {
    var callsLength, args, firstArgument, secondArgument;

    scope.$broadcast = sinon.spy();
    obj[method]();
    callsLength = scope.$broadcast.args.length;
    args = scope.$broadcast.args[callsLength - 1 - reverseIndexCall];
    firstArgument = args[0];
    secondArgument = args[1][0];
    expect(firstArgument).to.equal(firstValue);
    expect(secondArgument).to.equal(secondValue);
  };
})();
