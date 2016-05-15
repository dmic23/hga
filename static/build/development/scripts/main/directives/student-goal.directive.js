(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentGoal', studentGoal);

    studentGoal.$inject = ['$sce', 'Users','$uibModal'];

    function studentGoal($sce, Users, $uibModal) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                goals: '=',
            },
            link: function(scope, elem, attrs){
                console.log(scope);

                scope.open = function(goal){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-goal.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            console.log(goal);
                            if(goal.id){
                                vm.modalTitle = "Update Goal";
                                vm.studentGoal = goal;    
                            } else {
                                vm.modalTitle = "New Goal";
                                vm.studentGoal = {};                                 
                            }
                            
                            console.log(scope);

                            vm.openDate = function($event){
                                console.log("open date1")
                                $event.preventDefault();
                                $event.stopPropagation();
                                $timeout(function () {
                                    console.log("open date2")
                                    vm.showPicker.opened = !vm.showPicker.opened;
                                });
                            };

                            vm.showPicker = {
                                opened: false,
                            };

                            vm.closeModal = function (){
                                console.log('clse modal');
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitGoal = function(studentGoal){

                                if(goal.id){
                                    console.log(studentGoal);
                                    scope.updateGoal(studentGoal);  
                                } else {
                                    console.log(studentGoal);
                                    var userId = scope.userId;
                                    console.log(userId);
                                    scope.addGoal(userId, studentGoal); 
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

                console.log(scope);
                console.log(attrs);

                scope.updateGoal = function(updGoal){
                    console.log(updGoal);
                    var goalId = updGoal.id;
                    console.log(goalId);
                    if(updGoal.goal){
                        var goal = {
                            id: updGoal.id, 
                            goal: updGoal.goal,
                            goal_target_date: updGoal.goal_target_date,
                            goal_complete: updGoal.goal_complete,
                            goal_notes: updGoal.goal_notes,
                        };
                    } else {
                        var goal = updGoal;
                    }
                    console.log(goal);
                    Users.updateStudentGoal(goalId, goal)
                        .then(function(response){
                            console.log(response);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.addGoal = function(userId, goal){
                    console.log(userId);
                    console.log(goal);
                    goal['student'] = userId;
                    console.log(goal);
                    Users.createStudentGoal(goal)
                        .then(function(response){
                            console.log(response);
                            scope.goals.push(response);
                            // scope.newGoal = {};
                            // scope.showNewGoal = false;
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 

                scope.deleteGoal = function(goal){
                    var goalId = goal.id;
                    Users.deleteStudentGoal(goalId)
                        .then(function(response){
                            var index = scope.goals.indexOf(goal);
                            scope.goals.splice(index, 1);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }              
            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/student-goal.directive.html')),
        }
        return directive;
    }
})();