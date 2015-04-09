var Main = window.NBack.Main;

Main.directive("figuresButtons", function(MainHelpers, configuration) {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    templateUrl: "directives/figuresButtons.html",
    link: {
      post: function(scope) {
        let figuresButtons;

        class FiguresButtons {
          getDefaultButton(figure) {
            return {
              type: figure,
              name: configuration.figures[figure].buttonName
            };
          }
          constructor() {
            figuresButtons = this;
            figuresButtons.unset();
            MainHelpers.callMethodOnReceivedMessage('figuresButtons', scope, figuresButtons);
          }
          generate() {
            figuresButtons.generated = true;
            figuresButtons.buttons = [];
            if (configuration.grid.size > 1) {
              figuresButtons.addButton('position');
            }
            angular.forEach(configuration.currentFigures, function(currentFigure) {
              figuresButtons.addButton(currentFigure);
            });
          }
          addButton(figure) {
            let button = figuresButtons.getDefaultButton(figure);
            figuresButtons.buttons.push(button);
          }
          
          buttonClicked(buttonIndex) {
            let clickedButton = figuresButtons.buttons[buttonIndex];
            console.log("clickedButton", clickedButton);
          }

          unset() {
            figuresButtons.generated = false;
            figuresButtons.buttons = null;
          }
        }

        scope.figuresButtons = new FiguresButtons();
      }
    }
  };
});