(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['$scope', '$state', '$stateParams', 'Main', 'Users', 'Upload'];

    function UserProfileController($scope, $state, $stateParams, Main, Users, Upload){
        var vm = this;
        console.log($stateParams);
        vm.playLevelColor = {
            'WHITE': 'bg-white',
            'RED': 'bg-red',
            'YELLOW': 'bg-yellow',
            'GREEN': 'bg-green',
            'BLUE': 'bg-blue',
            'PURPLE': 'bg-purple',
            'BROWN': 'bg-brown',
            'BLACK': 'bg-black',
        }
        activate();

        function activate(){
            if(Main.isAuthAcct()){
                vm.authAcct = Main.getAuthAcct();
                console.log(vm.authAcct);
                if($stateParams.userId && vm.authAcct.is_staff){
                    vm.profId = $stateParams.userId;                   
                } else {
                    vm.profId = vm.authAcct.id;
                    console.log(vm.profId);
                    $state.transitionTo('app.profile', {userId: vm.profId}, { notify: false });
                }
                getUser(vm.profId);
            } else {
                $state.go('app.dashboard');
            }
        }

        function getUser(id){
            Users.getUser(id)
                .then(getUserSuccess)
                .catch(getUserError);
        }

        vm.updateProfile = function(user){
            console.log(user)

            Upload.upload({
                url: 'api/v1/users/'+user.id+'/',
                data: user,
                method: 'PUT',
            })
            .then(function (resp) {
                console.log(resp.data);
                console.log('Success ' + resp.config.data.user_pic.name + 'uploaded. Response: ' + resp.data);
                getUserSuccess(resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.user_pic.name);
            });
        }

        function getUserSuccess(response){
            console.log(response);
            vm.respUser = response;
            var userCopy = angular.copy(vm.respUser)
            vm.user = _.omit(userCopy, 'student_goal', 'student_log', 'student_material', 'student_wishlist', 'student_objective');
            console.log(vm.user);
        }

        function getUserError(errMsg){
            console.log(errMsg);
        }

        vm.clearChanges = function(){
            vm.user = {};
            vm.user = angular.copy(vm.respUser);
        }
    }
})();
