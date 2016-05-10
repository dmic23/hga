(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['$scope', '$state', '$stateParams', 'Main', 'Users'];

    function DashBoardController($scope, $state, $stateParams, Main, Users){
        var vm = this;
        console.log($stateParams);
        activate();

        function activate(){
            vm.dashId = $stateParams.userId; 
            getUser(vm.dashId);
        }

        function getUser(id){
            Users.getUser(id)
                .then(getUserSuccess)
                .catch(getUserError);
        }

        function getUserSuccess(response){
            console.log(response);
            vm.user = response;
        }

        function getUserError(errMsg){
            console.log(errMsg);
        }
    }
})();
