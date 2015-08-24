import utils from '../../utils';

class Configuration {
  constructor() {
    this.game = {
      rows: 3,
      cols: 3,
      nBack: 2,
      timeInterval: 2500,
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
          possibleValues: 'a b c d e f'.split(' ')
        },
        color: {
          name: 'Color',
          boundKey: 'c',
          possibleValues: '#ccc #CF0303 #197916 #2286A3'.split(' ')
        }
      },
      entities: ['position', 'letter', 'color']
    };
  }
}

export default ['configuration', Configuration];
