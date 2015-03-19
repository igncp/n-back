(function() {
  var Main = angular.module("Main", []);

  Main.factory("configuration", function() {
    return {
      nBack: 2,
      sessionTime: 120
    };
  });

  Main.factory("screenService", function() {
    return {
      link: function() {
      }
    };
  });

  Main.directive("screen", function(screenService) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "directives/screen.html",
      link: screenService.link
    };
  });
})();
