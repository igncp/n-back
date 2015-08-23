import utils from '../../../utils';

class State {
  constructor(opts) {
    this.values = utils.mapToObject((entityName) => {
      var entity = opts.availableEntities[entityName],
        value;

      if (entity.getValue) value = entity.getValue();
      else if (entity.possibleValues) value = utils.getRandomItemOfArray(entity.possibleValues);

      return [entityName, value];
    })(opts.entities);
  }
  entityIsEqualToOtherStates(entityName, otherState) {
    var currentStateEntityValue = this.values[entityName],
      otherStateEntityValue = otherState.values[entityName];

    return angular.equals(currentStateEntityValue, otherStateEntityValue);
  }
}

var _numberOfStates;

export class States {
  constructor(opts) {
    this.opts = opts;
  }
  reset() {
    this.currentStateIndex = -1;
    this.states = null;
    this.generate(this.opts);
  }
  generate(opts) {
    _numberOfStates = Math.ceil(opts.gameDuration / opts.timeInterval);
    this.states = R.map((stateNumber) => new State(opts))(R.range(0, _numberOfStates));
  }
  getCurrentState() {
    return this.states[this.currentStateIndex];
  }
  isInLastState() {
    if (this.currentStateIndex === (_numberOfStates - 1)) return true;
    return false;
  }
  moveToNextState() {
    this.currentStateIndex++;
  }
  getRemainingStates() {
    var states = this;

    return _numberOfStates - (states.currentStateIndex + 1);
  }
  currentStateEntityIsEqualToPrevious(entityName, previousPositions) {
    var previousStateIndex = this.currentStateIndex - previousPositions,
      previousState;

    if (previousStateIndex < 0) return false;
    else {
      previousState = this.states[previousStateIndex];
      return this.getCurrentState().entityIsEqualToOtherStates(entityName, previousState);
    }
  }
}
