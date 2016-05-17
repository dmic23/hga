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
                tempType: '=',
                userId: '=',
                authAcct: '=',
                objectives: '=',
            },
            link: function(scope, elem, attrs){
                
                console.log(scope);

                scope.sortType     = ['objective_complete', 'objective_created']; 
                scope.sortReverse  = false;
                scope.searchItem   = ''; 

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
                        var tempObj = {
                            id: updObjective.id, 
                            objective: updObjective.objective,
                            objective_complete: updObjective.objective_complete,
                            objective_notes: updObjective.objective_notes,
                        };
                    } else {
                        var tempObj = updObjective;
                        var curDate = scope.getDate();
                        tempObj['objective_complete_date'] = curDate.now;
                    }

                    console.log(tempObj);
                    Users.updateStudentObjective(objectiveId, tempObj)
                        .then(function(response){
                            var index = scope.objectives.indexOf(updObjective);
                            scope.objectives[index] = response;
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

                scope.addObjective = function(userId, objective){
                    console.log(userId);
                    console.log(objective);
                    objective['student'] = userId;
                    console.log(objective);
                    Users.createStudentObjective(objective)
                        .then(function(response){
                            console.log(response);
                            scope.objectives.push(response);
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
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-objective-'+attrs.tempType+'.directive.html'));
            }
        }
        return directive;
    }
})();