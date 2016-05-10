(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['$scope', '$state', '$stateParams', 'Main', 'Users'];

    function UserProfileController($scope, $state, $stateParams, Main, Users){
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
            vm.profileId = $stateParams.userId;
            getUser(vm.profileId);
        }

        function getUser(id){
            Users.getUser(vm.profileId)
                .then(getUserSuccess)
                .catch(getUserError);
        }

        vm.updateProfile = function(user){
            console.log(user)
            var newUser = {
                id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            };
            if(user.password&&user.confirm_password){
                newUser['password'] = user.password;
                newUser['confirm_password'] = user.confirm_password;
            }
            Users.updateUserProfile(newUser)
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
