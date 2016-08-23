(function() {
    'use strict';
    angular
        .module('app.common')
        .factory('errorLog', errorLog);

    function errorLog() {
        return {
            getErrors: getErrors
        };

        function getErrors(formErrors, validationPatterns) {
            var errorMesages = [];
            _.each(validationPatterns, function(vp) {
                if (formErrors[vp]) {
                    _.each(formErrors[vp], function(er) {
                        errorMesages.push({
                            name: er.$name
                        });
                    });
                }
            });

            return errorMesages;
        }
    }
}());