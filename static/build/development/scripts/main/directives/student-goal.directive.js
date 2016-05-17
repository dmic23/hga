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
                tempType: '=',
                userId: '=',
                goals: '=',
            },
            link: function(scope, elem, attrs){
                console.log(scope);

                scope.sortType     = ['goal_complete', 'goal_target_date']; 
                scope.sortReverse  = false;
                scope.searchItem   = '';   

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
                        var tempGoal = {
                            id: updGoal.id, 
                            goal: updGoal.goal,
                            goal_target_date: updGoal.goal_target_date,
                            goal_complete: updGoal.goal_complete,
                            goal_notes: updGoal.goal_notes,
                        };
                    } else {
                        var tempGoal = updGoal;
                        var curDate = scope.getDate();
                        tempGoal['goal_complete_date'] = curDate.now;

                    }
                    console.log(tempGoal);
                    Users.updateStudentGoal(goalId, tempGoal)
                        .then(function(response){
                            var index = scope.goals.indexOf(updGoal);
                            scope.goals[index] = response;
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

                scope.addGoal = function(userId, goal){
                    console.log(userId);
                    console.log(goal);
                    goal['student'] = userId;
                    console.log(goal);
                    Users.createStudentGoal(goal)
                        .then(function(response){
                            console.log(response);
                            scope.goals.push(response);
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
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-goal-'+attrs.tempType+'.directive.html'));
            }

        }
        return directive;
    }
})();