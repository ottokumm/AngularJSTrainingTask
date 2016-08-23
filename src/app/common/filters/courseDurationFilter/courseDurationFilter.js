(function() {
    'use strict';

    angular
        .module('app.common')
        .filter('courseDurationFilter', courseDurationFilter);

    function courseDurationFilter() {
        return function(timeToF) {
            var tempT = _.parseInt(timeToF),
                timeval = isNaN(tempT) ? 0 : tempT > 0 ? tempT : 0,
                hours = Math.floor(timeval / 60),
                minutes = timeval - hours * 60,
                hoursDescr = hours === 0 ? '' : hours === 1 ? hours + ' hour ' : hours + ' hours ';

            return hoursDescr + minutes + ' min ';
        };
    }
}());