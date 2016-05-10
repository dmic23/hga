(function () {
    'use strict';

    angular
        .module('main.services')
        .factory('Main', Main);

    Main.$inject = ['$rootScope', '$http', '$q', '$state'];

    function Main($rootScope, $http, $q, $state) {
        var vm = this;

        var Main = {
            login: login,
            logout: logout,
            setAuthAcct: setAuthAcct,
            isAuthAcct: isAuthAcct,
        };

        return Main;

        function generalCallbackSuccess(response){
            console.log(response)
            console.log(response.data)
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function login(username, password) {
            return $http.post('/api/v1/auth/login/', {
                username: username, 
                password: password,
            }).then(loginSuccess).catch(generalCallbackError);
        }

        function loginSuccess(response) {
            console.log(response);
            Main.setAuthAcct(response.data);
            return response.data
        }

        function setAuthAcct(acct) {
            console.log(acct);
            localStorage.setItem('authAcct', JSON.stringify(acct.id));
        }

        function isAuthAcct(){
            return (localStorage.getItem('authAcct')) ? true : false;
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/')
                .then(logoutSuccess)
                .catch(generalCallbackError);
        }

        function logoutSuccess(response) {
            localStorage.clear();
            $state.go('login');
        }

    }
})();
