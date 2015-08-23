import utils from '../../utils';

class Configuration {
  constructor() {
    this.game = {
      rows: 3,
      cols: 3,
      nBack: 2,
      timeInterval: 2000,
      gameDuration: 60000,
      availableEntities: {
        position: {
          name: 'Position',
          boundKey: 'p',
          getValue: () => [utils.getRandomInt(0, this.game.rows), utils.getRandomInt(0, this.game.cols)]
        },
        letter: {
          name: 'Letter',
          boundKey: 'l',
          possibleValues: 'a b c'.split(' ')
        }
      },
      entities: ['position', 'letter']
    };
  }
}

export default ['configuration', Configuration];
