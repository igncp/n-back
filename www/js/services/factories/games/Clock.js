import utils from '../../../utils';

export class Clock {
  constructor(opts) {
    this.timePassed = null;
    this.configure(opts);
  }
  configure(opts) {
    opts = opts || {};

    this.timeInterval = opts.timeInterval || this.timeInterval || 1000;
    this.tickFn = opts.tickFn || this.tickFn || utils.NOOP;
  }
  start() {
    this.timePassed = 0;
    this.intervalId = setInterval(() => {
      this.timePassed += this.timeInterval;
      if (this.tickFn) this.tickFn();
    }, this.timeInterval);
  }
  stop() {
    clearInterval(this.intervalId);
    this.timePassed = null;
  }
}
