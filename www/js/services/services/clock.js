var clock = ['clock',
  class Clock {
    constructor() {
      this.timePassed = 0;
    }
    start() {
      console.log('started');
      console.log("this.timePassed", this.timePassed);
    }
    stop() {}
  }
];


export default clock;
