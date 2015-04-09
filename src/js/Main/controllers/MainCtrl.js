var Main = window.NBack.Main;

Main.controller('MainCtrl', function($scope) {
  $scope.toggleMenu = function() {
    var wrapClass = 'toggle-wrap',
      wrap = document.querySelector('.' + wrapClass);

    if (wrap.className.match('active')) wrap.className = wrapClass;
    else wrap.className = wrapClass + ' active';

    $('aside').animate({
      width: 'toggle'
    }, 300);
  };
});
