(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentWishList', studentWishList);

    studentWishList.$inject = ['$sce', 'Users'];

    function studentWishList($sce, Users) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                wishLists: '=',
            },
            link: function(scope, elem, attrs){
                
                scope.newWishList = {};

                scope.updateWishList = function(updWishList){
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

                scope.addWishList = function(userId, wishList){
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

                scope.deleteWishList = function(wishList){
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