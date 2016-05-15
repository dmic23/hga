(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentMaterials', studentMaterials);

    studentMaterials.$inject = ['$sce', 'Users', '$uibModal', 'Upload'];

    function studentMaterials($sce, Users, $uibModal, Upload) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                materials: '=',
                path: '=',
            },
            link: function(scope, elem, attrs){
                
                scope.open = function(material){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-materials.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            console.log(material);
                            if(material.id){
                                vm.modalTitle = "Update Material";
                                vm.newMaterial = material;    
                            } else {
                                vm.modalTitle = "Add Material";
                                vm.newMaterial = {};                                 
                            }
                            
                            console.log(scope);

                            vm.closeModal = function (){
                                console.log('clse modal');
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitMaterial = function(newMaterial){

                                if(material.id){
                                    console.log(newMaterial);
                                    scope.updateMaterial(newMaterial);  
                                } else {
                                    console.log(newMaterial);
                                    var userId = scope.userId;
                                    console.log(userId);
                                    scope.addMaterial(userId, newMaterial); 
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

                scope.updateMaterial = function(updMaterial){
                    console.log(updMaterial);
                    var materialId = updMaterial.id;
                    console.log(materialId);
                    // if(updMaterial.wish_item){
                    //     var wishList = {
                    //         id: updWishList.id, 
                    //         wish_item: updWishList.wish_item,
                    //         wish_item_complete: updWishList.wish_item_complete,
                    //         wish_item_notes: updWishList.wish_item_notes,
                    //     };
                    // } else {
                    var material = updMaterial;
                    // }
                    console.log(wishList);
                    Users.updateStudentMaterial(materialId, material)
                        .then(function(response){
                            console.log(response);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.addMaterial = function(userId, material){
                    console.log(userId);
                    console.log(material);
                    material['student'] = userId;
                    console.log(material);
                    // Users.createStudentMaterial(material)
                    //     .then(function(response){
                    //         console.log(response);
                    //         scope.materials.push(response);
                    //         // scope.newWishList = {};
                    //         // scope.showNewWishList = false;
                    //     }).catch(function(errorMsg){
                    //         console.log(errorMsg);
                    //     });

    
                    Upload.upload({
                        url: 'api/v1/student-materials/',
                        data: material,
                    })
                        .then(function (resp) {
                            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                        }, function (resp) {
                            console.log('Error status: ' + resp.status);
                        }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        });

                } 

                scope.deleteMaterial = function(material){
                    var materialId = material.id;
                    Users.deleteStudentMaterial(materialId)
                        .then(function(response){
                            var index = scope.materials.indexOf(material);
                            scope.materials.splice(index, 1);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 
            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/student-materials.directive.html')),
        }
        return directive;
    }
})();