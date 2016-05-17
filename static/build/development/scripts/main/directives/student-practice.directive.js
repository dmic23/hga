(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentPracticeLog', studentPracticeLog);

    studentPracticeLog.$inject = ['$sce', 'Users', '$uibModal', '$timeout'];

    function studentPracticeLog($sce, Users, $uibModal, $timeout) {

        var directive = {
            restrict: 'EA',
            scope: {
                tempType: '=',
                userId: '=',
                practiceLogs: '=',
            },
            link: function(scope, elem, attrs){
                
                console.log(scope);

                scope.sortType     = ['practice_item_created']; 
                scope.sortReverse  = false;
                scope.searchItem   = ''; 

                scope.open = function(practiceLog){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-practice.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            console.log(practiceLog);
                            if(practiceLog.id){
                                vm.modalTitle = "Update Practice";
                                vm.newPracticeLog = practiceLog;    
                            } else {
                                vm.modalTitle = "New Practice";
                                vm.newPracticeLog = {};                                 
                            };

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
                            console.log(scope);

                            vm.closeModal = function (){
                                console.log('clse modal');
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitNewPracticeLog = function(newPracticeLog){

                                if(practiceLog.id){
                                    console.log(newPracticeLog);
                                    scope.updatePracticeLog(newPracticeLog);  
                                } else {
                                    console.log(newPracticeLog);
                                    var userId = scope.userId;
                                    console.log(userId);
                                    scope.addPracticeLog(userId, newPracticeLog); 
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

                scope.updatePracticeLog = function(practiceLog){
                    console.log(practiceLog);
                    var practLog = _.omit(practiceLog, 'practice_item_created');
                    console.log(practLog);
                    Users.updateStudentPracticeLog(practLog)
                        .then(function(response){
                            console.log(response);
                            scope.pracLog = _.findWhere(scope.practiceLogs, {id: practiceLog.id});
                            console.log(scope.pracLog);
                            scope.pracLog['practice_category_display'] = response.practice_category_display;
                            console.log(scope.pracLog);
                            scope.getStats();
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
                            scope.getStats();
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }; 

                scope.deletePracticeLog = function(practiceLog){
                    var practiceLogId = practiceLog.id;
                    Users.deleteStudentPracticeLog(practiceLogId)
                        .then(function(response){
                            var index = scope.practiceLogs.indexOf(practiceLog);
                            scope.practiceLogs.splice(index, 1);
                            scope.getStats();
                        }).catch(function(errorMsg){
                            console.log(errorMsg);
                        });
                }; 

                scope.getStats = function(){
                    $timeout(function(){
                        console.log(scope.practiceLogs);
                        var times = [];
                        var speeds = [];
                        scope.maxSpeed = 0;
                        angular.forEach(scope.practiceLogs, function(v,k){
                            console.log('val', v);
                            console.log('key', k);
                            if(v.practice_time){
                                var time = parseInt(v.practice_time);
                                console.log(time);
                                times.push(time);
                            }
                            if(v.practice_speed){
                                var speed = parseInt(v.practice_speed);
                                console.log(speed);
                                if(speed > scope.maxSpeed){
                                    scope.maxSpeed = speed;
                                }
                                speeds.push(speed);
                            }
                        });
                        console.log(times);
                        console.log(speeds);
                        scope.sumTimes = times.reduce(function(a, b) { return a + b; });
                        console.log(scope.sumTimes);
                        scope.sumSpeeds = speeds.reduce(function(a, b) { return a + b; });
                        console.log(scope.Speeds);                    
                    }, 1000);                    
                };
                scope.getStats();

            },
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-practice-'+attrs.tempType+'.directive.html'));
            }
        }
        return directive;
    }
})();