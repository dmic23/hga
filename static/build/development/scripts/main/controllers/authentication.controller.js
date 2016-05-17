(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$sce', '$state', 'Main'];

    function AuthenticationController($scope, $sce, $state, Main){
        var vm = this;

        activate();

        function activate(){
            if(Main.isAuthAcct()){
                vm.authUser = Main.getAuthAcct();
                console.log(vm.authUser);
                $state.go('app.dashboard', {'userId': vm.authUser.id});
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
            vm.loginError = errMsg.data.message;
        }

        var mediaPath = media_path('');
        console.log('media path', mediaPath);
        var staticPath = static_path('');
        console.log('static path', staticPath);

        $scope.path = { 
            static_files: $sce.trustAsResourceUrl(staticPath),
            media: $sce.trustAsResourceUrl(mediaPath),
        };

    }
})();
