(function() {
  var Main = window.NBack.Main;

  Main.directive("gamePanel", function(configuration, ClockService) {
    return {
      restrict: "E",
      replace: true,
      scope: {},
      templateUrl: "directives/gamePanel.html",
      link: {
        post: function(scope, panelEl) {
          let panel;

          class GamePanel {
            constructor() {
              panel = this;

              panel.configuration = configuration;
              panel.clock = new ClockService(panelEl[0]);
            }
            start() {
              scope.$broadcast('grid', ['start']);
              scope.$broadcast('figuresButtons', ['generate']);
              panel.clock.start();
              panelEl.bind('clockTick', function(data) {
                panel.clockTick(data);
              });
              panelEl.bind('clockStop', function() {
                panel.stop();
              });
            }
            clockTick(data) {
              scope.$broadcast('grid', ['refreshState', data]);
            }
            stop() {
              scope.$broadcast('grid', ['stop']);
              scope.$broadcast('figuresButtons', ['unset']);
              panel.clock.stop();
            }
          }

          scope.gamePanel = new GamePanel();
        }
      }
    };
  });
})();
