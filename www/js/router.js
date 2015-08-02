export var routerConfig = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider.state('game', {
      url: '/',
      controller: 'gameController',
      templateUrl: 'templates/game/main.html'
    });

    $urlRouterProvider.otherwise('/');
  }
];
