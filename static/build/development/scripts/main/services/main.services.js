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
            setAuthAcct: setAuthAcct,
            getAuthAcct: getAuthAcct,
            isAuthAcct: isAuthAcct,
            isStaffAcct: isStaffAcct,
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
            localStorage.setItem('authAcct', JSON.stringify({'id':acct.id, 'is_staff':acct.is_admin,}));
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
