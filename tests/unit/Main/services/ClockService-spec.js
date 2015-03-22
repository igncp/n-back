(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('ClockService', function() {
    let vClock, clock;
    beforeEach(function() {
      vClock = unit.injectVars(['configuration', 'ClockService']);
      clock = new vClock.ClockService();
    });

    it("has finalTime using sessionTime of the configuration", function() {
      expect(vClock.configuration.sessionTime).to.equal(clock.finalTime);
    });

    it("stop() clears the clock currentTime", function() {
      let restoreNativeClearInterval = unit.mockWindowFn('clearInterval');

      clock.currentTime = 100;
      clock.stop();
      expect(clock.currentTime).to.equal(0);

      restoreNativeClearInterval();
    });

    it("uses setInterval and stores it in intervalId", function() {
      let spy = sinon.spy(),
        fakeIntervalId = 1234,
        restoreNativeSetInterval = unit.mockWindowSetInterval(spy, fakeIntervalId);

      clock.start();
      expect(spy).to.have.been.called;
      expect(clock.intervalId).to.equal(fakeIntervalId);

      restoreNativeSetInterval();
    });

    describe('clockTick interval', function() {
      let dummyElement, clockAttachedToElement;
      beforeEach(function() {
        dummyElement = document.createElement('a');
        clockAttachedToElement = new vClock.ClockService(dummyElement);
      });
      
      unit.beforeEachMockMockableFnAndRestoreAfter(unit.mockWindowSetIntervalCallingOwnCb);
      
      it("emits the clockTick event", function() {
        let spy = sinon.spy();

        dummyElement.addEventListener('clockTick', spy);
        clockAttachedToElement.start();
        expect(spy).to.have.been.called;
      });

      it("increases clock currentTime", function() {
        expect(clockAttachedToElement.currentTime).to.equal(0);
        clockAttachedToElement.start();
        expect(clockAttachedToElement.currentTime).to.equal(1);
      });
    });
  });
})();
