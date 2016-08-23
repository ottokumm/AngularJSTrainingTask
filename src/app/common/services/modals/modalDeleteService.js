(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('modalDeleteService', modalDeleteService);

    function modalDeleteService($modal) {
        return {
            getModalInstance: getModalInstance
        };

        function getModalInstance(course) {
            return $modal.open({
                templateUrl: 'app/common/partials/modals/deleteConfirmModal/deleteConfirm.html',
                controller: 'deleteConfirmCtrl',
                controllerAs: 'vm',
                resolve: {
                    course: function() {
                        return course;
                    }
                }
            });
        }
    }
}());