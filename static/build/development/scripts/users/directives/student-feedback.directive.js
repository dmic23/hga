(function(){
    'use strict';

    angular
        .module('users.directives')
        .directive('studentFeedback', studentFeedback);

    studentFeedback.$inject = ['$sce', 'Users', 'Main', 'Schedule', 'Upload', '$uibModal'];

    function studentFeedback($sce, Users, Main, Schedule, Upload, $uibModal) {

        var directive = {
            restrict: 'EA',
            scope: {
                tempType: '=',
                userId: '=',
                userNameFull: '=',
                studentFeedbackAll: '=',
                authAcct: '=',
                path: '='
            },
            link: function(scope, elem, attrs){
                scope.open = function(feedBack){
                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/student-feedback.modal.html')),
                        controller: function($scope, $uibModalInstance){
                            var vm = this; 
                            vm.path = scope.path;
                            vm.edit = false;

                            if(feedBack){
                                scope.feedback = feedBack; 
                                vm.feedBack = angular.copy(feedBack); 
                            } else {
                                if(scope.authAcct.is_staff){
                                    vm.feedBack = {};
                                    vm.edit = true;
                                };
                            };

                            vm.userNameFull = scope.userNameFull;

                            if(scope.authAcct.is_staff){
                                vm.authAcct = scope.authAcct;

                                Schedule.getStudentCourseSchedule(scope.userId)
                                    .then(function(response){
                                       vm.studentCourses = response; 
                                    })
                                    .catch(function(errorMsg){
                                        console.log(errorMsg);
                                    });
                            }

                            vm.closeModal = function(){
                                vm.feedBack = {};
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.submitFeedBack = function(newFeedBack){
                                console.log(newFeedBack);
                                if(newFeedBack.id){
                                    scope.updateFeedback(newFeedBack);  
                                } else {
                                    var userId = scope.userId;
                                    scope.addFeedback(userId, newFeedBack); 
                                }
                                $uibModalInstance.close();
                            };

                            vm.removeFeedbackMaterial = function(material){
                                if(material.id){
                                    Users.deleteStudentFeedbackMaterial(material.id)
                                        .then(function(response){
                                            var index = vm.feedBack.material_feedback.indexOf(material);
                                            vm.feedBack.material_feedback.splice(index, 1);                                          
                                        })
                                        .catch(function(errorMsg){
                                            console.log(errorMsg);
                                        });
                                } else {
                                    var index = vm.feedBack.material_feedback.indexOf(material);
                                    vm.feedBack.material_feedback.splice(index, 1); 
                                };
                            };

                            vm.deleteFeedback = function(feedback){
                                if(feedback.id){
                                    scope.deleteFeedback(feedBack);
                                } else {
                                    vm.feedback = {};
                                };
                                $uibModalInstance.close();
                            };
                        },
                        controllerAs: 'vm',
                        size: 'lg',
                    });
                };
                
                scope.addFeedback = function(userId, feedback){
                    feedback['student'] = userId;
                    feedback['feedback_material'] = feedback.material_feedback;

                    delete feedback.material_feedback;

                    Upload.upload({
                        url: 'api/v1/student-feedback/',
                        data: feedback,
                        method: 'POST'
                    })
                    .then(function(response){
                        scope.studentFeedbackAll.push(response.data);
                    }, function(response){
                        console.log('Error status: ' + response.status);
                    }, function(evt){
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        scope.fileProgress = progressPercentage;
                        // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };

                scope.updateFeedback = function(feedback){
                    var temp_feedback = {
                        feedback_text: feedback.feedback_text
                    };

                    if(feedback.feedback_course.id != scope.feedback.feedback_course.id){
                        temp_feedback['feedback_course'] = feedback.feedback_course.id;
                    };

                    if(feedback.material_feedback.length){
                        var materials = [];
                        angular.forEach(feedback.material_feedback, function(val, key){
                            if(!val.id){
                                materials.push(val);
                            }
                        });
                        temp_feedback['feedback_material'] = materials;
                    };

                    Upload.upload({
                        url: 'api/v1/student-feedback/'+feedback.id+'/',
                        data: temp_feedback,
                        method: 'PUT',
                    })
                    .then(function(response){
                        var index = scope.studentFeedbackAll.indexOf(scope.feedback);
                        scope.studentFeedbackAll[index] = response.data;
                    }, function(response){
                        console.log('Error status: ' + response.status);
                    }, function(evt){
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        scope.fileProgress = progressPercentage;
                    });
                };

                scope.deleteFeedback = function(feedback){
                    Users.deleteStudentFeedback(feedback.id)
                        .then(function(response){
                            var index = scope.studentFeedbackAll.indexOf(feedback);
                            scope.studentFeedbackAll.splice(index, 1);                         
                        })
                        .catch(function(errorMsg){  
                            console.log(errorMsg);
                        })
                };

                scope.pageSetUp = function(){
                    scope.pageSet = {
                        viewby: "5",
                        totalItems: scope.studentFeedbackAll.length,
                        currentPage: 1,
                        itemsPerPage: "5",
                        maxSize: "5"
                    };
                };

                scope.$watch('studentFeedbackAll', function(newData, oldData) {
                    if(newData){
                        scope.pageSetUp();
                    };
                }, true);
            },
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-feedback-'+attrs.tempType+'.directive.html'));
            }

        }
        return directive;
    }
})();