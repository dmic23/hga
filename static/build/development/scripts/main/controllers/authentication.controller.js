(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', 'Main'];

    function AuthenticationController($scope, $state, Main){
        var vm = this;

        activate();

        function activate(){
            if(Main.isAuthAcct()){
                $state.go('app.dashboard');
            }

        }

        vm.login = function(username, password){

            Main.login(username, password)
                .then(loginSuccess)
                .catch(loginError);
        }

        function loginSuccess(response){
            console.log(response);
            $state.go('app.dashboard', {'userId': response.id});
        }

        function loginError(errMsg){
            console.log(errMsg);
        }

    }
})();
