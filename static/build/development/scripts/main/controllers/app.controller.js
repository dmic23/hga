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
                console.log(authAcct.id);
                Users.getUser(authAcct.id).then(function(response){
                    console.log(response);
                    vm.currentUser = response;
                });
            } else {
                console.log("Could not get account");
            }
            
        }

        vm.logout = function(){
            Main.logout();
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
