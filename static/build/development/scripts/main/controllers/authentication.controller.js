(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$sce', '$state', 'Main', 'Users'];

    function AuthenticationController($scope, $sce, $state, Main, Users){
        var vm = this;

        activate();

        function activate(){
            if(Main.isAuthAcct()){
                vm.authUser = Main.getAuthAcct();
                $state.go('app.dashboard', {'userId': vm.authUser.id});
            }

        }

        vm.login = function(username, password){

            Main.login(username, password)
                .then(loginSuccess)
                .catch(loginError);
        }

        function loginSuccess(response){
            $state.go('app.dashboard', {'userId': response.id});
        }

        function loginError(errMsg){
            vm.loginError = errMsg.data.message;
        }

        vm.register = function(newUser){
            if(newUser.password===newUser.confirm_password){
                Main.register(newUser)
                    .then(registerSuccess)
                    .catch(registerError);
            } else {
                vm.registerError = "Passwords must match!"
            }
        }

        function registerSuccess(response){

            $.notify({
                icon: "ti-check",
                message: "Account has been created! Please sign in"

            },{
                type: 'success',
                timer: 1000,
                placement: {
                    from: 'top',
                    align: 'right',
                },
                template: '<div class="alert alert-{0} alert-with-icon" data-notify="container">'+
                '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
                '<span data-notify="icon"></span>'+
                '<span data-notify="message">{2}</span>'+
                '</div>'
            }); 
            $scope.isCollapsed = false;
            $scope.registerForm.$setPristine();
            vm.newUser = {};
            $state.go('login');
        }

        function registerError(errMsg){
            console.log(errMsg);
            if(errMsg.status === 500){
                vm.registerError = "username or email in use"
            } else {
                vm.registerError = errMsg.data.message;
            }
        }

        var mediaPath = media_path('');
        var staticPath = static_path('');

        $scope.path = { 
            static_files: $sce.trustAsResourceUrl(staticPath),
            media: $sce.trustAsResourceUrl(mediaPath),
        };

    }
})();
