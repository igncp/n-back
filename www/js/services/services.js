import utils from '../utils';

import games from './factories/games/games';

var registerFactories = utils.loopWithApp([
  games,
], 'factory');


import configuration from './services/configuration';

var registerNormalServices = utils.loopWithApp([
  configuration,
], 'service');

export var registerServices = function(app) {
  registerNormalServices(app);
  registerFactories(app);
};
