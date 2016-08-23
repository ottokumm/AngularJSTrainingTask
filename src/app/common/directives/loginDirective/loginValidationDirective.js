(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfCredentials', btfCredentials);

    function btfCredentials() {
        var regValid = /^[A-Za-z0-9_-]{1,16}$/;

        return {
            restrict: 'A',
            scope: {
                credValue: '='
            },
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch('credValue', function(newVal, oldVal) { //eslint-disable-line
                    newVal = newVal || '';
                    if (!newVal.match(regValid)) {
                        ctrl.$setValidity('btfDatetime', false);
                    } else {
                        ctrl.$setValidity('btfDatetime', true);
                    }
                });
            }
        };
    }
}());