import utils from '../utils';

import grid from './grid';
import panel from './panel';
import buttons from './buttons';

export var registerDirectives = utils.loopWithApp([
  panel,
  grid,
  buttons,
], 'directive');
