(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['Main'];

    function LogoutController(Main){
        var vm = this;

        activate();

        function activate(){
            if(Main.isAuthAcct()){
                Main.logout();
            }

        }
    }
})();
