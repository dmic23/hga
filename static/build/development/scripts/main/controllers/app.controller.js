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
                var authAcct = Main.getAuthAcct();
                Users.getUser(authAcct.id).then(function(response){
                    vm.currentUser = response;
                });
            } else {
                console.log("Could not get account");
            }
            
        }

        $scope.$on("update_user_info", function(event, message){
            vm.currentUser = message;
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
            'WHITE': 'bg-white',
            'RED': 'bg-red',
            'YELLOW': 'bg-yellow',
            'GREEN': 'bg-green',
            'BLUE': 'bg-blue',
            'PURPLE': 'bg-purple',
            'BROWN': 'bg-brown',
            'BLACK': 'bg-black',
        }

    }
})();
