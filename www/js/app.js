import {routerConfig} from './router';
import {registerServices} from './services/services';
import {registerDirectives} from './directives/directives';
import {registerControllers} from './controllers/controllers';

var nBack = angular.module('nback', ['ionic']).run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(()=> {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) window.StatusBar.styleDefault();
  });
}]);

registerServices(nBack);
registerControllers(nBack);
registerDirectives(nBack);

nBack.config(routerConfig);