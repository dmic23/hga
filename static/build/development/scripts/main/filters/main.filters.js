(function () {
    'use strict';

    angular
        .module('main.filters')
        .filter('numberpad', numberpad);

        numberpad.$inject = [];

        function numberpad() {
            return function(input, places) {
                var out = "";
                if(places){
                    var placesLength = parseInt(places, 10);
                    var inputLength = input.toString().length;

                    for(var i = 0; i < (placesLength - inputLength); i++){
                        out = '0' + out;
                    }   
                    out = out + input;
                }
                return out;
            };
        }; 

    angular
        .module('main.filters')
        .filter('propsFilter', propsFilter);

        propsFilter.$inject = [];

        function propsFilter() {
            return function(items, props){
                var out = [];

                if(angular.isArray(items)){
                    var keys = Object.keys(props);

                    items.forEach(function(item) {
                        var itemMatches = false;

                        for(var i = 0; i < keys.length; i++){
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if(item[prop].toString().toLowerCase().indexOf(text) !== -1){
                                itemMatches = true;
                                break;
                            }
                        }

                        if(itemMatches){
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        }; 

    angular
        .module('main.filters')
        .filter('matDateFilter', matDateFilter);

        matDateFilter.$inject = [];

        function matDateFilter() {
            return function(x, y, z){
                if(!y.is_admin){
                    var matDate = _.findWhere(z.student_material_item, {student: y.id});
                    if(matDate){
                        return matDate.student_added;
                    } else {
                        return z.material_added;
                    }
                    
                } else {
                    return z.material_added;
                }
            };
        };

    angular
        .module('main.filters')
        .filter('materialLabelFilter', materialLabelFilter);

        materialLabelFilter.$inject = [];

        function materialLabelFilter() {
            return function(materials, labels) {
                var filtered = [];
                if(labels.length){
                    angular.forEach(materials, function(val){
                        if(val.material_label.length){
                            angular.forEach(val.material_label, function(v){
                                if(_.contains(labels, v.label_name,0)){
                                    filtered.push(val);
                                };
                            });
                        };
                    });
                    return filtered;
                }else{
                    return materials;
                };
            };
        }; 

    angular
        .module('main.filters')
        .filter('noteLabelFilter', noteLabelFilter);

        noteLabelFilter.$inject = [];

        function noteLabelFilter() {
            return function(notes, labels) {
                var filtered = [];
                if(labels.length){
                    angular.forEach(notes, function(val){
                        if(val.note_label.length){
                            angular.forEach(val.note_label, function(v){
                                if(_.contains(labels, v.label_name,0)){
                                    filtered.push(val);
                                };
                            });
                        };
                    });
                    return filtered;
                }else{
                    return notes;
                };
            };
        }; 
})();
