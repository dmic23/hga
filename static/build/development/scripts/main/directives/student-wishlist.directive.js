(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentWishList', studentWishList);

    studentWishList.$inject = ['$sce', 'Users', '$uibModal'];

    function studentWishList($sce, Users, $uibModal) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                wishLists: '=',
            },
            link: function(scope, elem, attrs){
                
                scope.open = function(wishItem){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-wishlist.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            console.log(wishItem);
                            if(wishItem.id){
                                vm.modalTitle = "Update Wish";
                                vm.newWishItem = wishItem;    
                            } else {
                                vm.modalTitle = "New Wish";
                                vm.newWishItem = {};                                 
                            }
                            
                            console.log(scope);

                            vm.closeModal = function (){
                                console.log('clse modal');
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitWishItem = function(newWishItem){

                                if(wishItem.id){
                                    console.log(newWishItem);
                                    scope.updateWishItem(newWishItem);  
                                } else {
                                    console.log(newWishItem);
                                    var userId = scope.userId;
                                    console.log(userId);
                                    scope.addWishItem(userId, newWishItem); 
                                }
                                $uibModalInstance.close();
                            }

                            console.log(scope);
                            console.log($scope);
    
                        },
                        controllerAs: 'vm',
                        size: 'lg',
                    });
                }

                scope.updateWishItem = function(updWishList){
                    console.log(updWishList);
                    var wishListId = updWishList.id;
                    console.log(wishListId);
                    if(updWishList.wish_item){
                        var wishList = {
                            id: updWishList.id, 
                            wish_item: updWishList.wish_item,
                            wish_item_complete: updWishList.wish_item_complete,
                            wish_item_notes: updWishList.wish_item_notes,
                        };
                    } else {
                        var wishList = updWishList;
                    }
                    console.log(wishList);
                    Users.updateStudentWishList(wishListId, wishList)
                        .then(function(response){
                            console.log(response);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.addWishItem = function(userId, wishList){
                    console.log(userId);
                    console.log(wishList);
                    wishList['student'] = userId;
                    console.log(wishList);
                    Users.createStudentWishList(wishList)
                        .then(function(response){
                            console.log(response);
                            scope.wishLists.push(response);
                            scope.newWishList = {};
                            scope.showNewWishList = false;
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 

                scope.deleteWishItem = function(wishList){
                    var wishListId = wishList.id;
                    Users.deleteStudentWishList(wishListId)
                        .then(function(response){
                            var index = scope.wishLists.indexOf(wishList);
                            scope.wishLists.splice(index, 1);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 
            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/student-wishlist.directive.html')),
        }
        return directive;
    }
})();