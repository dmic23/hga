(function () {
    'use static';

    angular
        .module('main.controllers')
        .controller('LeaderBoardController', LeaderBoardController);

    LeaderBoardController.$inject = ['$scope', '$state', '$stateParams', 'Main', 'Users'];

    function LeaderBoardController($scope, $state, $stateParams, Main, Users){
        var vm = this;
        console.log($stateParams);
        activate();
        function activate(){
            if(Main.isAuthAcct()){
                vm.authAcct = Main.getAuthAcct();
                console.log(vm.authAcct);
                if($stateParams.userId && vm.authAcct.is_staff){
                    vm.dashId = $stateParams.userId;                   
                } else {
                    vm.dashId = vm.authAcct.id;
                    console.log(vm.dashId);
                    $state.transitionTo('app.leaderboard', {userId: vm.dashId}, { notify: false });
                }
                getUser(vm.dashId);
                Users.getAll()
                    .then(getAllSuccess)
                    .catch(getUserError);
            } else {
                $state.go('login');
            }

        }

        function getUser(id){
            Users.getUser(id)
                .then(getUserSuccess)
                .catch(getUserError);
        }

        function getUserSuccess(response){
            console.log(response);
            vm.user = response;
        }

        function getUserError(errMsg){
            console.log(errMsg);
        }

        function getAllSuccess(response){
            console.log(response);
            vm.allUsers = response;
            vm.leaderBoard = [];
            angular.forEach(vm.allUsers, function(v,k){
                console.log(v);
                console.log(k);
                if(v.student_log.length){
                    var sums = vm.getSum(v.student_log);
                } else {
                    var sums = {
                        max_speed: 0,
                        speed_total: 0,
                        speed_avg: 0,                
                        time_total: 0,
                        time_avg: 0,
                        last_practice: 'no practice',
                    };
                }
                console.log(sums);
                var tempUser = {
                    first_name: v.first_name,
                    last_name: v.last_name,
                    play_level: v.play_level,
                    practice_speed_high: sums.max_speed,
                    practice_speed_avg: sums.speed_avg,
                    practice_speed_total: sums.speed_total,
                    practice_time_avg: sums.time_avg,
                    practice_time_total: sums.time_total,
                    practice_count: v.student_log.length,
                    last_practice_date: sums.last_practice,
                    goals_complete: v.student_goal.length,
                    objectives_complete: v.student_objective.length,
                    wishes_complete: v.student_wishlist.length,
                }
                console.log(tempUser);
                vm.leaderBoard.push(tempUser);
            });
        }

        vm.getSum = function(studentLog){
            console.log(studentLog);
            var times = [];
            var speeds = [];
            var maxSpeed = 0;
            var lastPrac = '';
            angular.forEach(studentLog, function(v,k){
                console.log('val', v);
                console.log('key', k);
                if(v.practice_time){
                    var time = parseInt(v.practice_time);
                    console.log(time);
                    times.push(time);
                } else {
                    times.push(0);
                }
                if(v.practice_speed){
                    var speed = parseInt(v.practice_speed);
                    console.log(speed);
                    if(speed > maxSpeed){
                        maxSpeed = speed;
                    }
                    speeds.push(speed);
                } else {
                    speeds.push(0);
                }

                if(v.practice_date){
                    if(v.practice_date > lastPrac){
                        lastPrac = v.practice_date;
                    }
                }
            });
            console.log(times);
            console.log(speeds);
            var sumTimes = times.reduce(function(a, b) { return a + b; });
            console.log(sumTimes);
            var sumSpeeds = speeds.reduce(function(a, b) { return a + b; });
            console.log(sumSpeeds);
            return {
                max_speed: maxSpeed,
                speed_total: sumSpeeds,
                speed_avg: sumSpeeds / studentLog.length,                
                time_total: sumTimes,
                time_avg: sumTimes / studentLog.length,
                last_practice: lastPrac,
            };       
        }
    }
})();
