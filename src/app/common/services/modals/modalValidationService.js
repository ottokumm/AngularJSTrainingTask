(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('modalValidationService', modalValidationService);

    function modalValidationService($modal) {
        return {
            getModalInstance: getModalInstance
        };

        function getModalInstance(errors) {
            return $modal.open({
                templateUrl: 'app/common/partials/modals/validationErrorModal/validationError.html',
                controller: 'validationErrorCtrl',
                controllerAs: 'vm',
                resolve: {
                    errors: function() {
                        return errors;
                    }
                }
            });
        }
    }
}());