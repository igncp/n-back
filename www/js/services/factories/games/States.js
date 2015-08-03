class State {
  constructor(dimsArray) {
    
  }
}

export class States {
  constructor(opts) {
    this.states = null;
    if (opts) this.generate(opts);
  }
  generate(opts) {
    console.log("opts", opts);
    var numberOfStates = Math.ceil(opts.gameDuration / opts.timeInterval);
    this.states = [];
    _.each(_.range(0, numberOfStates), (stateNumber) => {
      this.states.push(new State([opts.rows, opts.cols]));
    });
  }
}
