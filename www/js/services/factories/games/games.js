import utils from '../../../utils';
import {Game} from './Game';

var games = utils.generateDefaultApiFn(Game, ['configuration']);

export default ['games', games];
