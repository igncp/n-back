import utils from '../utils';

import configuration from './factories/configuration';

var registerFactories = utils.loopWithApp([
  configuration
], 'factory');


import clock from './services/clock';

var registerNormalServices = utils.loopWithApp([
  clock,
], 'service');

export var registerServices = function(app) {
  registerNormalServices(app);
  registerFactories(app);
};
