(function() {
  var Main = window.NBack.Main;
  
  Main.service("ClockService", function($rootScope, configuration) {
    let tickEvent = document.createEvent('Event');
    tickEvent.initEvent('clockTick', true, true);

    class Clock {
      constructor(elementAttachedTo) {
        let clock = this;

        clock.elementAttachedTo = elementAttachedTo;
      }
      start() {
        let clock = this;

        if (clock.started === true) clock.stop();

        clock.finalTime = configuration.sessionTime;
        clock.currentTime = 0;
        clock.started = true;
        clock.intervalId = setInterval(function() {
          $rootScope.$apply(function() {
            clock.currentTime += 1;
            clock.dispatchEventToElementAttached();
            if (clock.currentTime === clock.finalTime) {
              clock.stop();
            }
          });
        }, configuration.stateTime);
      }
      dispatchEventToElementAttached() {
        let clock = this;
        if (clock.elementAttachedTo[0]) {
          clock.elementAttachedTo[0].dispatchEvent(tickEvent);
        } else {
          clock.elementAttachedTo.dispatchEvent(tickEvent);
        }
      }
      stop() {
        let clock = this;
        if (typeof(clock.intervalId) === 'number') {
          clearInterval(clock.intervalId);
        }
        clock.currentTime = 0;
        clock.started = false;
      }
    }

    return Clock;
  });
})();
