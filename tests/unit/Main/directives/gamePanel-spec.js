(function() {
  var unit = window.unit,
    directives = unit.directives,
    MDirectives = unit.Main.directives;

  unit.Main.directives.testsWrapper('gamePanel', function() {
    unit.directives.assertThatElementDirectiveIsTransformed('game-panel');
    unit.describe("element", function() {
      var elementHTML;
      beforeEach(function() {
        elementHTML = elementHTML || unit.directives.getCompileHTMLFromTagName('game-panel');
      });

      unit.it("has expected elements inside", function() {
        directives.expectClassIsPresentInsideHTMLString('grid', elementHTML);
        directives.expectClassIsPresentInsideHTMLString('figures-buttons', elementHTML);
      });
    });

    unit.describe("panelScope", function() {
      unit.describe('gamePanel', function() {
        var panelScope, gamePanel, gameData,
          testItBroadcastsTheExpectedData = function(reverseIndexCall, method, directive, command) {
            unit.it("broadcasts the expected event", function() {
              MDirectives.expectBroadcastFirstAndSecondArgument(panelScope, reverseIndexCall, gamePanel, method, directive, command);
            });
          };
        beforeEach(function() {
          panelScope = unit.directives.getScopeFromDirectiveTagName('game-panel');
          gamePanel = panelScope.gamePanel;
          gameData = unit.injectVars(['gameData']).gameData;
        });

        unit.describe("constructor()", function() {
          unit.it("has the required dependencies", function() {
            expect(gamePanel).to.have.a.property('configuration');
            expect(gamePanel).to.have.a.property('clock');
          });
        });

        unit.describe("start()", function() {
          unit.it("starts the clock", function() {
            panelScope.$broadcast = sinon.spy();
            gamePanel.clock.start = sinon.spy();

            unit.expectSpyIsCalledAfterFnAndNotBefore(gamePanel.clock.start, gamePanel.start);
          });

          testItBroadcastsTheExpectedData(1, 'start', 'grid', 'start');
          testItBroadcastsTheExpectedData(0, 'start', 'figuresButtons', 'generate');

          unit.it("generates a history of states", function() {
            expect(gameData.historyOfStates).to.be.empty;
            gamePanel.start();
            expect(gameData.historyOfStates).not.to.be.empty;
          });
        });

        unit.describe("stop()", function() {
          unit.it("stops the clock", function() {
            panelScope.$broadcast = sinon.spy();
            gamePanel.clock.stop = sinon.spy();

            unit.expectSpyIsCalledAfterFnAndNotBefore(gamePanel.clock.stop, gamePanel.stop);
          });

          testItBroadcastsTheExpectedData(1, 'stop', 'grid', 'stop');
          testItBroadcastsTheExpectedData(0, 'stop', 'figuresButtons', 'unset');

          unit.it("clears the history of states", function() {
            gameData.historyOfStates = ['foo'];
            expect(gameData.historyOfStates).not.to.be.empty;
            gamePanel.stop();
            expect(gameData.historyOfStates).to.be.empty;
          });
        });

        unit.describe("clockTick()", function() {
          testItBroadcastsTheExpectedData(0, 'clockTick', 'grid', 'refreshState');
        });
      });
    });
  });
})();
