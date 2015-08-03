import {Clock} from './Clock';
import {Score} from './Score';
import {States} from './States';

export class Game {
  constructor(configuration) {
    this.states = new States(configuration.game);
    this.score = new Score();
    this.clock = new Clock({
      timeInterval: configuration.game.timeInterval,
      tickFn: function() {
        console.log('FOO');
      }
    });
  }
}
