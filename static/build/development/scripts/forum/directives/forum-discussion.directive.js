(function () {
    'use strict';

    angular
        .module('forum.directives')
        .directive('forumDiscussion', forumDiscussion);

    forumDiscussion.$inject = ['$sce', 'Users', 'Forum', '$uibModal'];

    function forumDiscussion($sce, Users, Forum, $uibModal) {

        var directive = {
            restrict: 'EA',
            scope: {
                category: '=',
                userId: '=',
                path: '=',
                playLevelColor: '=',
                discussionClass: '='

            },
            link: function(scope, elem, attrs){

                scope.newMessage = {};

                scope.open = function(objective){

                    var modalInstance = $uibModal.open({
                        templateUrl: $sce.trustAsResourceUrl(static_path('views/modals/forum-topic.modal.html')),
                        controller: function($scope, $uibModalInstance, $timeout){
                            var vm = this;
                            
                            vm.closeModal = function (){
                                $uibModalInstance.dismiss('cancel');
                            };

                            vm.addNewTopic = function(newTopic){
                                scope.addTopic(newTopic);
                                $uibModalInstance.close();
                            }
                        },
                        controllerAs: 'vm',
                        size: 'lg',
                    });
                }

                scope.addTopic = function(newTopic){
                    newTopic['category_id'] = scope.category.id;
                    Forum.addNewTopic(newTopic)
                        .then(addTopicSuccess)
                        .catch(addTopicError);
                    
                }

                function addTopicSuccess(response){
                    scope.category.category_topic.push(response);
                    scope.getMessages(response.id);

                }

                function addTopicError(errMsg){
                    console.log(errMsg);
                }

                scope.getMessages = function(topicId){
                    scope.messageClass = "animated fadeOutLeft";
                    Forum.getAllMessages(topicId)
                        .then(getAllMessagesSuccess)
                        .catch(getAllMessagesError);
                }

                function getAllMessagesSuccess(response){
                    scope.messages = response;
                    scope.messageClass = "animated fadeInRight";
                }

                function getAllMessagesError(errMsg){
                    console.log(errMsg);
                }

                scope.addMessage = function(newMessage, msgId){
                    var msg = {
                        message: newMessage, 
                        topic_id: msgId
                    };

                    Forum.addNewMessage(msg)
                        .then(addNewMessageSuccess)
                        .catch(addNewMessageError);
                }

                function addNewMessageSuccess(response){
                    
                    scope.newMessage = {};
                    scope.messages.topic_message.push(response);
                }

                function addNewMessageError(errMsg){
                    console.log(errMsg);
                }

                scope.$watch('category', function(newVal) {
                        if(newVal){
                            scope.messages = '';
                        }
                }, true);

            },
            templateUrl: $sce.trustAsResourceUrl(static_path('views/directives/forum-discussion.directive.html')),

        }
        return directive;
    }
})();