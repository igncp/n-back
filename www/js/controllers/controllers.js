import {game} from './game-controller';
import utils from '../utils';

export var registerControllers = utils.loopWithApp([game], 'controller');
