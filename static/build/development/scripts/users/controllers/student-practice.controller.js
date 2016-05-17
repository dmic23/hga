(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('StudentPracticeController', StudentPracticeController);

    StudentPracticeController.$inject = ['$scope', '$state', '$stateParams', 'Main', 'Users'];

    function StudentPracticeController($scope, $state, $stateParams, Main, Users){
        var vm = this;
        console.log($stateParams);
        activate();
        function activate(){
            if(Main.isAuthAcct()){
                vm.authAcct = Main.getAuthAcct();
                console.log(vm.authAcct);
                if($stateParams.userId && vm.authAcct.is_staff){
                    vm.dashId = $stateParams.userId;                   
                } else {
                    vm.dashId = vm.authAcct.id;
                    console.log(vm.dashId);
                    $state.transitionTo('app.student-practice', {userId: vm.dashId}, { notify: false });
                }
                getUser(vm.dashId);
            } else {
                $state.go('login');
            }

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
