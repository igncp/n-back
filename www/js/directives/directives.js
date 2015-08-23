import utils from '../utils';

import grid from './grid';
import panel from './panel';
import buttons from './buttons';
import result from './result';

export var registerDirectives = utils.loopWithApp([
  panel,
  grid,
  buttons,
  result,
], 'directive');
