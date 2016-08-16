(function() {
    'use strict';

    angular
        .module('app.common')
        .filter('courseTitleFilter', courseTitleFilter);

    function courseTitleFilter() {
        return function(itemsList, filterValue) {
            return _.filter(itemsList, function(f) {
                return f.title.toLowerCase().includes(filterValue.toLowerCase());
            });
        };
    }

}());