(function () {
    'use strict';

    angular
        .module('hga.routes')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('app.dashboard');
        });

        $stateProvider

            .state('app', {
                abstract: true,
                url: '/app',
                controller: 'AppController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/views/main/app.html',
                data: {
                    requireLogin: true
                },
            })
            .state('app.dashboard', {
                url: '/dashboard/:userId',
                controller: 'DashBoardController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/views/main/dashboard.html',
                data: {
                    requireLogin: true
                },
            })
            .state('app.profile', {
                url: '/profile/:userId',
                controller: 'UserProfileController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/views/users/user-profile.html',
                data: {
                    requireLogin: true
                },
            })
            .state('login', {
                url: '/login',
                controller: 'AuthenticationController',
                controllerAs: 'vm',     
                templateUrl: 'static/build/development/views/main/login.html',
                data: {
                    requireLogin: false
                },
            });
            // //dashboard
            // .state('app.dashboard', {
            //     url: '/dashboard',
            //     controller: 'DashboardController',
            //     controllerAs: 'vm',
            //     templateUrl: static_path('views/dashboard.html'),
            //     resolve: {
            //         plugins: ['$ocLazyLoad', function($ocLazyLoad) {
            //             return $ocLazyLoad.load([
            //                 static_path('scripts/vendor/datatables/datatables.bootstrap.min.css')
            //             ]);
            //         }]
            //     },
            //     data: {
            //     requireLogin: true
            //     },
            // });
    }
})();

