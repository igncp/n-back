import {composeWithEventEmitter} from '../../../eventEmitter';

import {Clock} from './Clock';
import {Score} from './Score';
import {States} from './States';

export class Game {
  constructor(configuration) {
    var game = this;

    game.states = new States(configuration.game);
    game.score = new Score();
    game.clock = new Clock({
      timeInterval: configuration.game.timeInterval,
      tickFn: function() {
        game.emitWithCurrentState('state-change-before');
        if (game.states.isInLastState() === false) {
          game.states.moveToNextState();
          game.emitWithCurrentState('state-change-after');
        } else game.finish();
      }
    });
    game.configuration = configuration.game;
  }
  finish() {
    var game = this;

    game.stop();
    game.result = game.score.getSummary();
    game.emit('game-finish');
  }
  emitWithCurrentState(msg) {
    var game = this,
      currentState = game.states.getCurrentState();

    game.emit(msg, currentState);
  }
  start() {
    var game = this;

    game.states.reset();
    game.score.reset();
    game.clearEntitiesSet();
    game.clock.start();
    game.states.moveToNextState();
    return game.states.getCurrentState();
  }
  getRemainingStates() {
    var game = this;
    
    return game.states.getRemainingStates();
  }
  stop() {
    var game = this;

    game.clock.stop();
  }
  clearEntitiesSet() {
    var game = this;

    game.entitiesSet = {};
  }
  setEntity(entityName) {
    var game = this,
      resultIsSuccess = game.states.currentStateEntityIsEqualToPrevious(entityName, game.configuration.nBack);

    game.entitiesSet[entityName] = true;
    return resultIsSuccess;
  }
  checkAndUnsetAllEntities() {
    var game = this,
      equalToPrevious;
    R.forEach((entityName) => {
      equalToPrevious = game.states.currentStateEntityIsEqualToPrevious(entityName, game.configuration.nBack);
      if (equalToPrevious) game.score.add(entityName, game.entitiesSet[entityName]);
      else if (game.entitiesSet[entityName]) game.score.add(entityName, false);
    })(game.configuration.entities)
    game.clearEntitiesSet();
  }
}

composeWithEventEmitter(Game);
