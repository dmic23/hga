(function () {
    'use strict';

    angular
        .module('hga', [
            'ngAnimate',
            'ngTouch',
            'ngSanitize',
            'ngCookies',
            'ngFileUpload',
            'ngAudio',
            'angularMoment',
            'monospaced.elastic',
            'ui.router',
            'ui.bootstrap',
            'ui.select',
            'mwl.calendar',
            'hga.config',
            'hga.routes',
            'main',
            'users',
            'forum',
            'schedule'
        ]);

    angular
        .module('hga.config', ['ui.router']);

    angular
        .module('hga.routes', ['ui.router.router']);

    angular
        .module('hga')
        .run(runCSRF);

    runCSRF.$inject = ['$http'];

    function runCSRF($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

    angular
        .module('hga')
        .run(runIsAuthAcct);

    runIsAuthAcct.$inject = ['$rootScope', '$state', 'Main'];

    function runIsAuthAcct($rootScope, $state, Main) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;
            var auth = Main.isAuthAcct();

            if(requireLogin && !auth){
                event.preventDefault();
                $state.go('login');
                return $rootScope;
            }
        });
    }

})();