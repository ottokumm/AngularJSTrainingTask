(function() {
    'use strict';

    angular
        .module('app.common')
        .directive('btfValuesEnumeration', btfValuesEnumeration);

    function btfValuesEnumeration() {
        return {
            restrict: 'E',
            scope: {
                values: '='
            },
            link: function(scope) {
                var vCount = 0,
                    vLength = scope.values.length,
                    delimeter = ', ';

                scope.enumString = '';

                for (vCount = 0; vCount < vLength; vCount++) {
                    delimeter = vCount === vLength - 1 ? '' : delimeter;
                    scope.enumString += scope.values[vCount].name + delimeter;
                }

            },

            template: '{{enumString}}'
        };
    }
}());