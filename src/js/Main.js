(function() {
  var Main = angular.module('Main', []);

  Main.factory('configuration', function() {
    return {
      nBack: 2
    };
  });

  Main.directive('screen', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'directives/screen.html'
    };
  });
})();
