var Main = window.NBack.Main;

let originalFigures = {
  letters: {
    buttonName: 'Letter',
    values: ['A', 'B', 'C', 'D']
  },
  colors: {
    buttonName: 'Color',
    values: ['#CCC', '#F00', '#0F0', '#00F']
  },
  position: {
    buttonName: 'Position'
  }
};
Main.constant('originalFigures', originalFigures);
Main.value('configuration', {
  nBack: 2,
  sessionTime: 120,
  stateTime: 2000,
  figures: angular.copy(originalFigures),
  currentFigures: ['letters'],
  grid: {
    size: 3
  }
});
