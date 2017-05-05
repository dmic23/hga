(function(){
	'use strict'

	angular
		.module('main.directives')
		.directive('studentLabelDisplay', studentLabelDisplay);

	studentLabelDisplay.$inject = ['$sce'];

	function studentLabelDisplay($sce){
		var directive = {
			restrict: 'EA',
			scope: {
				labels: '=',
				filterLabels: '='
			},
			link: function(scope, elem, attr){

				scope.allLabels = [];

				function activate(){
					angular.forEach(scope.labels, function(v,k){
						if(!_.some(scope.allLabels, function(e){return e.id == v.id})){
							scope.allLabels.push(v);
						};
					});					
				};

				scope.addLabel = function(label){
					scope.filterLabels.push(label.label_name);
				};

				scope.removeLabel = function(index){
					scope.filterLabels.splice(index, 1);
				};

				scope.$watch('labels', function(newData, oldData) {
					if(newData){
						activate();
					}
				}, true);
			},
            templateUrl: function(elem,attrs){
                return $sce.trustAsResourceUrl(static_path('views/directives/student-label-display.directive.html'));
            }
		}

		return directive;
	}
})();