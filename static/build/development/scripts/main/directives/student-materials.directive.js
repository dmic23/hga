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
                tempType: '=',
                userId: '=',
                materials: '=',
                path: '=',
            },
            link: function(scope, elem, attrs){

                scope.sortType     = ['-material_added']; 
                scope.sortReverse  = false;
                scope.searchItem   = '';

                scope.open = function(material){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-materials.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            
                            if(material.id){
                                vm.modalTitle = "Update Material";
                                vm.newMaterial = material;    
                            } else {
                                vm.modalTitle = "Add Material";
                                vm.newMaterial = {};                                 
                            }
                            
                            vm.closeModal = function (){
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitMaterial = function(newMaterial){

                                if(material.id){
                                    scope.updateMaterial(newMaterial);  
                                } else {
                                    var userId = scope.userId;
                                    scope.addMaterial(userId, newMaterial); 
                                }
                                $uibModalInstance.close();
                            }
                        },
                        controllerAs: 'vm',
                        size: 'lg',
                    });
                }

                scope.updateMaterial = function(updMaterial){
                    var omittedMat = _.omit(updMaterial, 'material_added_by', 'student');
                    var materialId = updMaterial.id;
                    var newMaterial = omittedMat;
                    Upload.upload({
                        url: 'api/v1/student-materials/'+materialId+'/',
                        data: newMaterial,
                        method: 'PUT',
                    })
                    .then(function (resp) {
                        var index = scope.materials.indexOf(updMaterial);
                        scope.materials[index] = resp.data;
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                }

                scope.addMaterial = function(userId, material){
                    material['student'] = userId;
                    Upload.upload({
                        url: 'api/v1/student-materials/',
                        data: material,
                    })
                    .then(function (resp) {
                        scope.materials.push(resp.data);
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
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-materials-'+attrs.tempType+'.directive.html'));
            }
        }
        return directive;
    }
})();