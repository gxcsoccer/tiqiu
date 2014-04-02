angular.module('tiqiu', ['ui.router', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
        })
        .state('404', {
          url: '^/404',
          templateUrl: 'partial/404.html'
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