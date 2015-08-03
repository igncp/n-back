class Configuration {
  constructor() {
    this.game = {
      rows: 3,
      cols: 3,
      timeInterval: 1200,
      gameDuration: 60000,
      availableEntities: [{
        key: 'position',
        name: 'Position'
      }, {
        key: 'letter',
        name: 'Letter',
        values: 'a b c d e f g h'.split(' ')
      }],
      entities: ['position', 'letter']
    };
  }
}


export default ['configuration', Configuration];
