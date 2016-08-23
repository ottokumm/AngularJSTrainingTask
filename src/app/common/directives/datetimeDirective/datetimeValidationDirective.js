(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfDatetime', btfDatetime);

    function btfDatetime() {
        var regInput = /^\d{1,2}(\.(\d{1,2}(\.(\d{1,4})?)?)?)?$/,
            regValid = /^\d{2}\.\d{2}\.\d{4}$/;

        return {
            restrict: 'A',
            scope: {
                datetimeValue: '='
            },
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                scope.$watch('datetimeValue', function(newVal, oldVal) { //eslint-disable-line
                    newVal = newVal || '';
                    if (!newVal.match(regInput)) {
                        scope.datetimeValue = oldVal;
                    } else if (!newVal.match(regValid)) {
                        ctrl.$setValidity('btfDatetime', false);
                    } else {
                        ctrl.$setValidity('btfDatetime', true);
                    }
                });
            }
        };
    }
}());