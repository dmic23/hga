(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentPracticeLog', studentPracticeLog);

    studentPracticeLog.$inject = ['$sce', 'Users'];

    function studentPracticeLog($sce, Users) {

        var directive = {
            restrict: 'EA',
            scope: {
                userId: '=',
                practiceLogs: '=',
            },
            link: function(scope, elem, attrs){
                
                scope.newPracticeLog = {};

                scope.updatePracticeLog = function(practiceLog){
                    console.log(practiceLog);
                    var practLog = _.omit(practiceLog, 'practice_item_created');
                    console.log(practLog);
                    Users.updateStudentPracticeLog(practLog)
                        .then(function(response){
                            console.log(response);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }

                scope.addPracticeLog = function(userId, practiceLog){
                    console.log(userId);
                    console.log(practiceLog);
                    practiceLog['student'] = userId;
                    console.log(practiceLog);
                    Users.createStudentPracticeLog(practiceLog)
                        .then(function(response){
                            console.log(response);
                            scope.practiceLogs.push(response);
                            scope.newPracticeLog = {};
                            scope.showNewPracticeLog = false;
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 

                scope.deletePracticeLog = function(practiceLog){
                    var practiceLogId = practiceLog.id;
                    Users.deleteStudentPracticeLog(practiceLogId)
                        .then(function(response){
                            var index = scope.practiceLogs.indexOf(practiceLog);
                            scope.practiceLogs.splice(index, 1);
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                } 
            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/student-practice.directive.html')),
        }
        return directive;
    }
})();