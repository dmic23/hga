(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentGoal', studentGoal);

    studentGoal.$inject = ['$sce', 'Users'];

    function studentGoal($sce, Users) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                goals: '=',
            },
            link: function(scope, elem, attrs){
                
                scope.newGoal = {};

                scope.open = function() {
                    scope.popup.opened = true;
                };
                scope.popup = {
                    opened: false
                };

                scope.newGoalOpen = function() {
                    scope.newGoalpopup.opened = true;
                };
                scope.newGoalpopup = {
                    opened: false
                };

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
                            scope.newGoal = {};
                            scope.showNewGoal = false;
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