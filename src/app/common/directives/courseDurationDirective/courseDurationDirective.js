(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfDuration', btfDuration);

    function btfDuration() {
        return {
            restrict: 'E',
            scope: {
                duration: '='
            },
            templateUrl: 'app/common/directives/courseDurationDirective/courseDurationTemplate.html'
        };
    }
}());