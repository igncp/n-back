(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('ClockService', function() {
    let clock, configuration, ClockService, gridElement;
    beforeEach(function() {
      gridElement = unit.directives.getCompileElementFromTagName('grid');
      let wrapper = unit.injectVars(['configuration', 'ClockService']);
      ClockService = wrapper.ClockService;
      clock = new wrapper.ClockService(gridElement);
      configuration = wrapper.configuration;
    });

    unit.describe("stop()", function() {
      unit.it("clears the clock currentTime", function() {
        let restoreNativeClearInterval = unit.mockWindowFn('clearInterval');

        clock.currentTime = 100;
        clock.stop();
        expect(clock.currentTime).to.equal(0);

        restoreNativeClearInterval();
      });
    });

    unit.describe("start()", function() {
      let $rootScope;
      beforeEach(function() {
        $rootScope = unit.injectVars(['$rootScope']).$rootScope;
      });

      unit.it("uses setInterval and stores it in intervalId", function() {
        let spy = sinon.spy(),
          fakeIntervalId = 1234,
          restoreNativeSetInterval = unit.mockWindowSetInterval(spy, fakeIntervalId);

        clock.start();
        expect(spy).to.have.been.called;
        expect(clock.intervalId).to.equal(fakeIntervalId);

        restoreNativeSetInterval();
      });

      unit.it("sets expected variables", function() {
        unit.expectObjectToLackAllOfTheseKeys(clock, ['finalTime', 'currentTime', 'started']);
        clock.start();
        expect(clock.finalTime).to.equal(configuration.sessionTime);
        expect(clock.currentTime).to.equal(0);
        expect(clock.started).to.equal(true);
      });

      unit.it("uses $rootScope.$apply inside this asynchronous fn", function() {
        let restoreNativeSetInterval = unit.mockWindowSetInterval();
        $rootScope.$apply = sinon.spy();
        
        unit.expectSpyIsCalledAfterFnAndNotBefore($rootScope.$apply, clock.start.bind(clock));
        restoreNativeSetInterval();
      });
    });

    describe('clockTick interval', function() {
      let dummyElement, clockAttachedToElement;
      beforeEach(function() {
        dummyElement = document.createElement('a');
        clockAttachedToElement = new ClockService(dummyElement);
      });

      unit.beforeEachMockMockableFnAndRestoreAfter(unit.mockWindowSetIntervalCallingOwnCb);

      it("emits the clockTick event", function() {
        let spy = sinon.spy();

        dummyElement.addEventListener('clockTick', spy);
        clockAttachedToElement.start();
        expect(spy).to.have.been.called;
      });
    });
  });
})();
