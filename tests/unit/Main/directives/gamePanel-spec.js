(function() {
  var unit = window.unit;

  unit.Main.directives.testsWrapper('gamePanel', function() {
    unit.directives.assertThatElementDirectiveIsTransformed('game-panel');

    unit.describe('the link-scopes gamePanel instance', function() {
      let panelScope, gamePanelInstance;
      beforeEach(function() {
        panelScope = unit.directives.getScopeFromDirectiveTagName('game-panel');
        gamePanelInstance = panelScope.gamePanel;
      });

      unit.it("has the required dependencies", function() {
        expect(gamePanelInstance).to.have.a.property('configuration');
        expect(gamePanelInstance).to.have.a.property('clock');
      });

      unit.describe('start and stop', function() {
        unit.describe("stubbing $broadcast", function() {
          beforeEach(function() {
            panelScope.$broadcast = sinon.spy();
          });

          unit.it("starts and stops the clock when the game is started / stopped", function() {
            gamePanelInstance.clock.start = sinon.spy();
            gamePanelInstance.clock.stop = sinon.spy();

            gamePanelInstance.start();
            expect(gamePanelInstance.clock.start).to.have.been.called;
            expect(gamePanelInstance.clock.stop).to.not.have.been.called;
            gamePanelInstance.stop();
            expect(gamePanelInstance.clock.stop).to.have.been.called;
          });

          unit.it("broadcasts the expected events when started / stopped", function() {
            let getCommandOfLastCall = function() {
              let calls = panelScope.$broadcast.args.length;
              return panelScope.$broadcast.args[calls - 1][1][0];
            };

            gamePanelInstance.start();
            expect(getCommandOfLastCall()).to.equal('start');
            gamePanelInstance.stop();
            expect(getCommandOfLastCall()).to.equal('stop');
            gamePanelInstance.clockTick();
            expect(getCommandOfLastCall()).to.equal('refreshState');
          });
        });

        let gameData;
        beforeEach(function() {
          gameData = unit.injectVars(['gameData']).gameData;
        });

        unit.it("generates a history of states when started and clears when stopped", function() {
          expect(gameData.historyOfStates).to.be.empty;
          gamePanelInstance.start();
          expect(gameData.historyOfStates).not.to.be.empty;
          gamePanelInstance.stop();
          expect(gameData.historyOfStates).to.be.empty;
        });
      });

    });
  });
})();
