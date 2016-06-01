(function () {
    'use strict';

    angular
        .module('main.controllers')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$sce', '$state', 'Main', 'Users'];

    function AppController($scope, $sce, $state, Main, Users){
        var vm = this;

        activate()

        function activate(){
            if(Main.isAuthAcct()){
                vm.authAcct = Main.getAuthAcct();
                Users.getUser(vm.authAcct.id).then(function(response){
                    vm.currentUser = response;
                });
            } else {
                console.log("Could not get account");
            }
            
        }

        $scope.$on("update_user_info", function(event, message){
            if(vm.authAcct.id == message.id){
                vm.currentUser = message;
            }
        });
        
        vm.logout = function(){
            Main.logout();
        }

        var mediaPath = media_path('');
        var staticPath = static_path('');

        $scope.path = { 
            static_files: $sce.trustAsResourceUrl(staticPath),
            media: $sce.trustAsResourceUrl(mediaPath),
        };

        $scope.playLevelColor = {
            '1': 'bg-white',
            '2': 'bg-red',
            '3': 'bg-yellow',
            '4': 'bg-green',
            '5': 'bg-blue',
            '6': 'bg-purple',
            '7': 'bg-brown',
            '8': 'bg-black',
        }

    }
})();
