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
          gamePanelInstance.start();
          expect(panelScope.$broadcast).to.have.been.calledWith('grid', ['start']);
          gamePanelInstance.stop();
          expect(panelScope.$broadcast).to.have.been.calledWith('grid', ['stop']);
          gamePanelInstance.clockTick();
          expect(panelScope.$broadcast).to.have.been.calledWith('grid', ['clockTick']);
        });
      });

    });
  });
})();
