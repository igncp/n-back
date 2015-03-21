(function() {
  var unit = window.unit;

  unit.Main.services.testsWrapper('clockService', function() {
    let vClock;
    beforeEach(function() {
      vClock = unit.injectVars(['configuration', 'clockService']);
    });

    it("has finalTime using sessionTime of the configuration", function() {
      expect(vClock.configuration.sessionTime).to.equal(vClock.clockService.finalTime);
    });

    it("start() uses setInterval and stores it in intervalId", function() {
      let spy = sinon.spy(),
        fakeIntervalId = 1234,
        restoreNativeSetInterval = unit.mockWindowSetInterval(spy, fakeIntervalId);

      vClock.clockService.start();
      expect(spy.called).to.equal(true);
      expect(vClock.clockService.intervalId).to.equal(fakeIntervalId);

      restoreNativeSetInterval();
    });

    it("stop() clears the clock currentTime", function() {
      let restoreNativeClearInterval = unit.mockWindowFn('clearInterval');

      vClock.clockService.currentTime = 100;
      vClock.clockService.stop();
      expect(vClock.clockService.currentTime).to.equal(0);

      restoreNativeClearInterval();
    });
  });
})();
