(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('Users', Users);

    Users.$inject = ['$http', '$q', '$state'];

    function Users($http, $q, $state) {
        var vm = this;

        var Users = {
            getAll: getAll,
            getUser: getUser,
            updateUserProfile: updateUserProfile,
            createStudentGoal: createStudentGoal,
            updateStudentGoal: updateStudentGoal,
            deleteStudentGoal: deleteStudentGoal,
            createStudentObjective: createStudentObjective,
            updateStudentObjective: updateStudentObjective,
            deleteStudentObjective: deleteStudentObjective,
            createStudentPracticeLog: createStudentPracticeLog,
            updateStudentPracticeLog: updateStudentPracticeLog,
            deleteStudentPracticeLog: deleteStudentPracticeLog,
            createStudentWishList: createStudentWishList,
            updateStudentWishList: updateStudentWishList,
            deleteStudentWishList: deleteStudentWishList,
        };

        return Users;

        function generalCallbackSuccess(response){
            console.log(response)
            console.log(response.data)
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function getAll(){
            return $http.get('api/v1/users/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function getUser(userId){
            return $http.get('api/v1/users/'+userId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateUserProfile(user){
            return $http.put('api/v1/users/'+user.id+'/', user)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);             
        }

        function createStudentGoal(goal){
            return $http.post('api/v1/student-goals/', goal)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentGoal(goalId, goal){
            return $http.put('api/v1/student-goals/'+goalId+'/', goal)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentGoal(goalId){
            return $http.delete('api/v1/student-goals/'+goalId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentObjective(objective){
            return $http.post('api/v1/student-objectives/', objective)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentObjective(objectiveId, objective){
            return $http.put('api/v1/student-objectives/'+objectiveId+'/', objective)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentObjective(objectiveId){
            return $http.delete('api/v1/student-objectives/'+objectiveId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentPracticeLog(practiceLog){
            return $http.post('api/v1/student-practice-logs/', practiceLog)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentPracticeLog(practiceLog){
            return $http.put('api/v1/student-practice-logs/'+practiceLog.id+'/', practiceLog)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentPracticeLog(practiceLogId){
            return $http.delete('api/v1/student-practice-logs/'+practiceLogId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentWishList(wishList){
            return $http.post('api/v1/student-wish-list/', wishList)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentWishList(wishListId, wishList){
            return $http.put('api/v1/student-wish-list/'+wishListId+'/', wishList)
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentWishList(wishListId){
            return $http.delete('api/v1/student-wish-list/'+wishListId+'/')
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

    }
})();
