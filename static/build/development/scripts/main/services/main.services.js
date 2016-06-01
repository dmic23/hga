(function () {
    'use strict';

    angular
        .module('main.services')
        .factory('Main', Main);

    Main.$inject = ['$http', '$q', '$state'];

    function Main($http, $q, $state) {
        var vm = this;

        var Main = {
            login: login,
            logout: logout,
            register: register,
            setAuthAcct: setAuthAcct,
            getAuthAcct: getAuthAcct,
            isAuthAcct: isAuthAcct,
            isStaffAcct: isStaffAcct,
        };

        return Main;

        function generalCallbackSuccess(response){
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject(response);
        }

        function login(username, password) {
            return $http.post('/api/v1/auth/login/', {
                username: username, 
                password: password,
            }).then(loginSuccess).catch(generalCallbackError);
        }

        function loginSuccess(response) {
            Main.setAuthAcct(response.data);
            return response.data
        }

        function register(newUser){
            return $http.post('api/v1/users/', newUser)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function setAuthAcct(acct) {
            localStorage.setItem('authAcct', JSON.stringify({'id':acct.id, 'is_staff':acct.is_admin, 'notification':''}));
        }

        function getAuthAcct(){
            return JSON.parse(localStorage.getItem('authAcct'));
        }

        function isAuthAcct(){
            return (localStorage.getItem('authAcct')) ? true : false;
        }

        function isStaffAcct(){
            var acct = JSON.parse(localStorage.getItem('authAcct'));
            return acct.is_staff;
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
