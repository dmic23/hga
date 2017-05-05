(function(){
	'use strict'

	angular
		.module('main.directives')
		.directive('studentLabel', studentLabel);

	studentLabel.$inject = ['$sce', 'Users'];

	function studentLabel($sce, Users){
		var directive = {
			restrict: 'EA',
			scope: {
				itemLabel: '=',
			},
			link: function(scope, elem, attr){

				function activate(){
					Users.getAllLabels()
						.then(getAllLabelsSuccess)
						.catch(function(errMsg){console.log(errMsg);});
				};

				function getAllLabelsSuccess(response){
					scope.allLabels = response;
				};

				scope.createLabel = function(labelName){
					var label = {
						'label_name': labelName,
						'label_new': true
					};
					return label;
				};

				scope.addLabel = function(label){
					delete label.$$hashKey
					delete label.isTag
					scope.itemLabel.push(label);
				};

				scope.removeLabel = function(item){
					var itemIndex = scope.itemLabel.indexOf(item);
					scope.itemLabel.splice(itemIndex, 1);
				};

				activate();
			},
            templateUrl: function(elem,attrs){
                return $sce.trustAsResourceUrl(static_path('views/directives/student-label.directive.html'));
            }
		}

		return directive;
	}
})();