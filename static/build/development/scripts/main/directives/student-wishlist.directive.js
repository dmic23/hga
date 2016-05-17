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
                tempType: '=',
                userId: '=',
                wishLists: '=',
            },
            link: function(scope, elem, attrs){

                scope.sortType     = ['wish_item_complete', 'wish_item_created']; 
                scope.sortReverse  = false;
                scope.searchItem   = '';

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
                        var tempWishList = {
                            id: updWishList.id, 
                            wish_item: updWishList.wish_item,
                            wish_item_complete: updWishList.wish_item_complete,
                            wish_item_notes: updWishList.wish_item_notes,
                        };
                    } else {
                        var tempWishList = updWishList;
                        var curDate = scope.getDate();
                        tempWishList['objective_complete_date'] = curDate.now;
                    }
                    console.log(tempWishList);
                    Users.updateStudentWishList(wishListId, tempWishList)
                        .then(function(response){
                            var index = scope.wishLists.indexOf(updWishList);
                            scope.wishLists[index] = response;
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.getDate = function(){
                    var today = new Date(); 
                    var dd = today.getDate(); 
                    var mm = today.getMonth()+1; 
                    var yyyy = today.getFullYear(); 
                    var hh = today.getHours(); 
                    var m = today.getMinutes(); 
                    var secs = today.getSeconds(); 
                    var now = yyyy+"-"+mm+"-"+dd+"T"+hh+":"+m+":"+secs;
                    return {today:today, dd:dd, mm:mm, yyyy:yyyy, hh:hh, m:m, secs:secs, now:now};
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
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-wishlist-'+attrs.tempType+'.directive.html'));
            }
        }
        return directive;
    }
})();