(function () {
    'use strict';

    angular
        .module('users.services')
        .factory('Users', Users);

    Users.$inject = ['$http', '$q', '$state', '$cookies'];

    function Users($http, $q, $state, $cookies) {
        var vm = this;

        var Users = {
            getAll: getAll,
            getUser: getUser,
            getAllSimpleUsers: getAllSimpleUsers,
            getUserLeaderBoard: getUserLeaderBoard, 
            getLocations: getLocations,
            getAllLabels: getAllLabels,
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
            createStudentMaterial: createStudentMaterial,
            updateStudentMaterial: updateStudentMaterial,
            deleteStudentMaterial: deleteStudentMaterial,
            createStudentNote: createStudentNote,
            updateStudentNote: updateStudentNote,
            deleteStudentNote: deleteStudentNote,
            createStudentFeedback: createStudentFeedback,
            updateStudentFeedback: updateStudentFeedback,
            deleteStudentFeedback: deleteStudentFeedback,
            deleteStudentFeedbackMaterial: deleteStudentFeedbackMaterial,

        };

        return Users;

        function generalCallbackSuccess(response){
            return response.data;
        }

        function generalCallbackError(response){
            return $q.reject('Error '+response.status+'');
        }

        function getAll(){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.get('api/v1/users/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function getUser(userId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.get('api/v1/users/'+userId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }
        
        function getAllSimpleUsers(){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.get('api/v1/users-simple/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function getUserLeaderBoard(){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.get('api/v1/users-leaderboard/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function getLocations(){
            var acct = $cookies.getObject('authAcct');
            return $http.get('api/v1/locations/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function getAllLabels(){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.get('api/v1/student-label/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateUserProfile(user){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/users/'+user.id+'/', user, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);             
        }

        function createStudentGoal(goal){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.post('api/v1/student-goals/', goal, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentGoal(goalId, goal){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/student-goals/'+goalId+'/', goal, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentGoal(goalId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.delete('api/v1/student-goals/'+goalId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentObjective(objective){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.post('api/v1/student-objectives/', objective, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentObjective(objectiveId, objective){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/student-objectives/'+objectiveId+'/', objective, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentObjective(objectiveId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.delete('api/v1/student-objectives/'+objectiveId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentPracticeLog(practiceLog){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.post('api/v1/student-practice-logs/', practiceLog, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentPracticeLog(practiceLog){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/student-practice-logs/'+practiceLog.id+'/', practiceLog, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentPracticeLog(practiceLogId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.delete('api/v1/student-practice-logs/'+practiceLogId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentWishList(wishList){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.post('api/v1/student-wish-list/', wishList, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentWishList(wishListId, wishList){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/student-wish-list/'+wishListId+'/', wishList, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentWishList(wishListId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.delete('api/v1/student-wish-list/'+wishListId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentMaterial(material){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.post('api/v1/student-materials/', material, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentMaterial(materialId, material){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.put('api/v1/student-materials/'+materialId+'/', material, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function deleteStudentMaterial(materialId){
            var acct = $cookies.getObject('authAcct');
            // $http.defaults.headers.common['Authorization'] = 'JWT ' + acct.token;
            return $http.delete('api/v1/student-materials/'+materialId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError); 
        }

        function createStudentNote(newNote){
            var acct = $cookies.getObject('authAcct');
            return $http.post('api/v1/student-notes/', newNote, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentNote(noteId, note){
            var acct = $cookies.getObject('authAcct');
            return $http.put('api/v1/student-notes/'+noteId+'/', note, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function deleteStudentNote(noteId){
            var acct = $cookies.getObject('authAcct');
            return $http.delete('api/v1/student-notes/'+noteId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function createStudentFeedback(newFeedback){
            var acct = $cookies.getObject('authAcct');
            return $http.post('api/v1/student-feedback/', newFeedback, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function updateStudentFeedback(feedbackId, feedback){
            var acct = $cookies.getObject('authAcct');
            return $http.put('api/v1/student-feedback/'+feedbackId+'/', feedback, {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function deleteStudentFeedback(feedbackId){
            var acct = $cookies.getObject('authAcct');
            return $http.delete('api/v1/student-feedback/'+feedbackId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

        function deleteStudentFeedbackMaterial(materialId){
            var acct = $cookies.getObject('authAcct');
            return $http.delete('api/v1/student-feedback-material/'+materialId+'/', {
                   'Authorization': 'JWT ' + acct.token
                })
                .then(generalCallbackSuccess)
                .catch(generalCallbackError);
        }

    }
})();
