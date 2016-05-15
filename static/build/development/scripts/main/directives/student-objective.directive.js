(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentObjective', studentObjective);

    studentObjective.$inject = ['$sce', 'Users', '$uibModal'];

    function studentObjective($sce, Users, $uibModal) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                authAcct: '=',
                objectives: '=',
            },
            link: function(scope, elem, attrs){
                
                console.log(scope);

                scope.open = function(objective){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-objective.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            console.log(objective);
                            if(objective.id){
                                vm.modalTitle = "Update Objective";
                                vm.studentObjective = objective;    
                            } else {
                                vm.modalTitle = "New Objective";
                                vm.studentObjective = {};                                 
                            }
                            
                            console.log(scope);

                            vm.closeModal = function (){
                                console.log('clse modal');
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitObjective = function(studentObjective){

                                if(objective.id){
                                    console.log(studentObjective);
                                    scope.updateObjective(studentObjective);  
                                } else {
                                    console.log(studentObjective);
                                    var userId = scope.userId;
                                    console.log(userId);
                                    scope.addObjective(userId, studentObjective); 
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
                
                scope.updateObjective = function(updObjective){
                    console.log(updObjective);
                    var objectiveId = updObjective.id;
                    console.log(objectiveId);
                    if(updObjective.objective){
                        var objective = {
                            id: updObjective.id, 
                            objective: updObjective.objective,
                            objective_complete: updObjective.objective_complete,
                            objective_notes: updObjective.objective_notes,
                        };
                    } else {
                        var objective = updObjective;
                    }
                    console.log(objective);
                    Users.updateStudentObjective(objectiveId, objective)
                        .then(function(response){
                            console.log(response);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.addObjective = function(userId, objective){
                    console.log(userId);
                    console.log(objective);
                    objective['student'] = userId;
                    console.log(objective);
                    Users.createStudentObjective(objective)
                        .then(function(response){
                            console.log(response);
                            scope.objectives.push(response);
                            // scope.newObjective = {};
                            // scope.showNewObjective = false;
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 

                scope.deleteObjective = function(objective){
                    var objectiveId = objective.id;
                    Users.deleteStudentObjective(objectiveId)
                        .then(function(response){
                            var index = scope.objectives.indexOf(objective);
                            scope.objectives.splice(index, 1);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 
            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/student-objective.directive.html')),
        }
        return directive;
    }
})();