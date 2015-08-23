import {routerConfig} from './router';
import {registerServices} from './services/services';
import {registerDirectives} from './directives/directives';
import {registerControllers} from './controllers/controllers';

var nBack = angular.module('nback', ['ionic']).run(['$ionicPlatform', '$rootScope', function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(() => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) window.StatusBar.styleDefault();
  });
  document.onkeypress = function(e) {
    e = e || window.event;
    $rootScope.$broadcast('keypress', e);
  };
}]);

registerServices(nBack);
registerControllers(nBack);
registerDirectives(nBack);

nBack.config(routerConfig);
