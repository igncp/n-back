(function() {
  var unit = window.unit;

  unit.Main.helpers.testsWrapper('MainHelpers', function() {
    var MainHelpers;
    beforeEach(function() {
      MainHelpers = unit.injectVars(['MainHelpers']).MainHelpers;
    });

    unit.describe("getNxNNullCells", function() {
      unit.it("generates expected dimensions arrays with expected values", function() {
        var cells;
        cells = MainHelpers.getNxNNullCells(1);
        unit.expectMatrixIsSquareAndOfSizeAndWithValue(cells, 1, null);
        cells = MainHelpers.getNxNNullCells(2);
        unit.expectMatrixIsSquareAndOfSizeAndWithValue(cells, 2, null);
        cells = MainHelpers.getNxNNullCells(3);
        unit.expectMatrixIsSquareAndOfSizeAndWithValue(cells, 3, null);

      });
    });

    unit.describe("callMethodOnReceivedMessage", function() {
      unit.it("the expected method is called when the expected message is received", function() {
        var broadcastData = ['barMethod', 'bazData'],
          scope = {
            $on: sinon.spy()
          },
          obj = {},
          onFn;

        obj.fooMethod = sinon.spy();
        obj.barMethod = sinon.spy();
        MainHelpers.callMethodOnReceivedMessage('target', scope, obj);
        expect(scope.$on).to.have.been.called;
        onFn = scope.$on.args[0][1];
        onFn('event', broadcastData);
        expect(obj.barMethod).to.have.been.called;
        expect(obj.barMethod.args[0]).to.eql(['bazData']);
        expect(obj.fooMethod).not.to.have.been.called;
      });
    });

  });
})();
