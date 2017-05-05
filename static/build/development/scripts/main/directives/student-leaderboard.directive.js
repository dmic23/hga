(function () {
    'use strict';

    angular
        .module('main.directives')
        .directive('studentLeaderboard', studentLeaderboard);

    studentLeaderboard.$inject = ['$sce', '$cookies', 'Users', '$timeout'];

    function studentLeaderboard($sce, $cookies, Users, $timeout) {

        var directive = {
            restrict: 'EA',
            scope: {
                tempType: '=',
                userId: '=',
                playLevelColor: '=',
                path: '='
            },
            link: function(scope, elem, attrs){

                scope.loading = true;
                
                scope.showInactive = '';

                scope.lb = {'searchItem':''};

                function activate(){
                    Users.getUserLeaderBoard()
                        .then(getAllSuccess)
                        .catch(getAllError);

                    scope.getRange('all');
                }

                function getUser(userId, users){
                    var curUser = _.findWhere(users, {'id': parseInt(userId)});
                }

                function getAllSuccess(response){
                    scope.allUsers = response;
                    getUser(scope.userId, scope.allUsers);
                    scope.leaderUsers = angular.copy(response);
                    scope.setLeaderboard(scope.leaderUsers);
                    pageSetup(scope.allUsers.length);
                    scope.loading = false;
                }

                function getAllError(errMsg){
                    console.log(errMsg);
                }

                function pageSetup(totalUsers){
                    scope.pageSet = {
                        viewby: '10',
                        totalItems: totalUsers,
                        currentPage: 1,
                        itemsPerPage: '10',
                        maxSize: 5
                    }
                }

                scope.setItemsPerPage = function(num){
                    scope.pageSet.itemsPerPage = num;
                    scope.pageSet.currentPage = 1;
                }

                scope.dateRange = moment("12-25-1995", "MM-DD-YYYY");

                scope.setLeaderboard = function(users){
                    scope.tempLeaderBoard = [];
                    angular.forEach(users, function(v,k){
                        if(v.student_log.length){
                            v.student_log = _.filter(v.student_log, function(item){
                                if(item.practice_date){
                                    return moment(item.practice_date).isAfter(scope.dateRange);
                                }
                            })
                            if(v.student_log.length){
                                var sums = scope.getSum(v.student_log);
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

                        if(v.student_goal.length){
                            v.student_goal = _.filter(v.student_goal, function(item){
                                return moment(item.goal_complete_date).isAfter(scope.dateRange);
                            })
                            if(v.student_goal.length){
                                var sg = _.where(v.student_goal, {goal_complete: true}).length;
                            } else {
                                var sg = 0;
                            }
                        } else {
                            var sg = 0;
                        }

                        if(v.student_objective.length){
                            v.student_objective = _.filter(v.student_objective, function(item){
                                return moment(item.objective_complete_date).isAfter(scope.dateRange);
                            })
                            if(v.student_objective.length){
                                var so = _.where(v.student_objective, {objective_complete: true}).length;
                            } else {
                               var so = 0; 
                            }
                        } else {
                            var so = 0;
                        }

                        if(v.student_wishlist.length){
                            v.student_wishlist = _.filter(v.student_wishlist, function(item){
                                return moment(item.wish_item_complete_date).isAfter(scope.dateRange);
                            })
                            if(v.student_wishlist.length){
                                var swl = _.where(v.student_wishlist, {wish_item_complete: true}).length;
                            } else {
                                var swl = 0;
                            }
                        } else {
                            var swl = 0;
                        }

                        var tempUser = {
                            id: v.id,
                            is_active: v.is_active,
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
                            goals_complete: sg,
                            objectives_complete: so,
                            wishes_complete: swl,
                        };
                        scope.tempLeaderBoard.push(tempUser);
                        if(scope.userId === tempUser.id){
                            scope.leaderBoardUser = tempUser;
                        }
                    });
                    scope.leaderBoard = _.sortBy(scope.tempLeaderBoard, 'practice_time_total').reverse();

                    if(scope.leaderBoardUser){
                        var dashIndex = scope.leaderBoard.indexOf(scope.leaderBoardUser);

                        if(dashIndex === 0){
                            scope.leaderBoard[dashIndex]['rank'] = dashIndex+1
                            scope.leaderBoard[dashIndex+1]['rank'] = dashIndex+2
                            scope.leaderBoard[dashIndex+2]['rank'] = dashIndex+3
                            scope.dashLeader = [scope.leaderBoard[dashIndex], scope.leaderBoard[dashIndex+1], scope.leaderBoard[dashIndex+2]];
                        } else if(dashIndex === scope.leaderBoard.length-1){
                            scope.leaderBoard[dashIndex-2]['rank'] = dashIndex-1
                            scope.leaderBoard[dashIndex-1]['rank'] = dashIndex
                            scope.leaderBoard[dashIndex]['rank'] = dashIndex+1
                            scope.dashLeader = [scope.leaderBoard[dashIndex-2], scope.leaderBoard[dashIndex-1], scope.leaderBoard[dashIndex]];

                        } else {
                            scope.leaderBoard[dashIndex-1]['rank'] = dashIndex;
                            scope.leaderBoard[dashIndex]['rank'] = dashIndex+1
                            scope.leaderBoard[dashIndex+1]['rank'] = dashIndex+2 
                            scope.dashLeader = [scope.leaderBoard[dashIndex-1], scope.leaderBoard[dashIndex], scope.leaderBoard[dashIndex+1]];
                           
                        }
                    }
                }

                scope.getSum = function(studentLog){
                    var times = [];
                    var speeds = [];
                    var avgDaily = [];
                    var maxSpeed = 0;
                    var lastPrac = '';
                    angular.forEach(studentLog, function(v,k){
                        if(v.practice_time){
                            var tempAvg = {};
                            var time = parseInt(v.practice_time);
                            times.push(time);

                            if(avgDaily.length){
                                var prac = _.findWhere(avgDaily, {date: v.practice_date});
                                if(prac){
                                    prac.tot = parseInt(prac.tot) + time;
                                } else {
                                    tempAvg.tot = time;
                                    tempAvg.date = v.practice_date;
                                    avgDaily.push(tempAvg);
                                }
                            } else {
                                tempAvg.tot = time;
                                tempAvg.date = v.practice_date;
                                avgDaily.push(tempAvg);
                            }
                        } 

                        if(v.practice_speed){
                            var speed = parseInt(v.practice_speed);
                            if(speed > maxSpeed){
                                maxSpeed = speed;
                            }
                            speeds.push(speed);
                        }

                        if(v.practice_date){
                            if(v.practice_date > lastPrac){
                                lastPrac = v.practice_date;
                            }
                        }
                    });
                    if(times.length){
                        var sumTimes = times.reduce(function(a, b) { return a + b; });
                    } else {
                        var sumTimes = 0;
                    }

                    if(speeds.length){
                        var sumSpeeds = speeds.reduce(function(a, b) { return a + b; });
                    } else {
                        var sumSpeeds = 0;
                    }
                    
                    if(avgDaily.length){
                        var sumDaily = 0;
                        _.each(avgDaily, function(v,k){ sumDaily += v.tot; })
                    } else {
                        var sumDaily = 0;
                    }

                    return {
                        max_speed: maxSpeed,
                        speed_total: sumSpeeds,
                        speed_avg: sumSpeeds / speeds.length,                
                        time_total: sumTimes,
                        time_avg: sumDaily / avgDaily.length,
                        last_practice: lastPrac,
                    };       
                }

                scope.resetLeaderboard = function(){
                    scope.dateRange = moment("12-25-1995", "MM-DD-YYYY");
                    var resetUsers = angular.copy(scope.allUsers);
                    scope.setLeaderboard(resetUsers);
                }

                scope.getRange = function(range){
                    scope.rangeBy = range;
                    if(scope.rangeBy === 'all'){
                        scope.resetLeaderboard();
                    } else {
                        scope.adjDate = moment().subtract(1, range);
                        scope.dateRange = scope.adjDate;
                        var rangeUsers = angular.copy(scope.allUsers);
                        scope.setLeaderboard(rangeUsers);
                    }
                }

                $timeout(function(){
                    activate();
                }, 1000);

            },
            templateUrl: function(elem,attrs) {
                return $sce.trustAsResourceUrl(static_path('views/directives/student-leaderboard-'+attrs.tempType+'.directive.html'));
            }
        }
        return directive;
    }
})();