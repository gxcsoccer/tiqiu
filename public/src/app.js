angular.module('tiqiu', ['ui.router', 'ui.bootstrap', 'chieffancypants.loadingBar'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'cfpLoadingBarProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeSpinner = true;

      $stateProvider
        .state('login', {
          url: '^/login',
          templateUrl: 'partial/login.html',
          controller: 'LoginCtrl'
        })
        .state('book', {
          url: '^/book',
          templateUrl: 'partial/book.html',
          controller: 'BookCtrl'
        });

      $urlRouterProvider.otherwise('login');
    }
  ])
  .run(['$rootScope', '$state', 'Auth',
    function($rootScope, $state, Auth) {

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!Auth.isLoggedIn() && toState.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
      });

    }
  ]);