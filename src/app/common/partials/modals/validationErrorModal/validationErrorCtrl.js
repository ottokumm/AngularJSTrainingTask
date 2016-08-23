(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('validationErrorCtrl', validationErrorCtrl);

    validationErrorCtrl.$inject = ['$modalInstance', 'errors'];

    function validationErrorCtrl($modalInstance, errors) {
        var vm = this;

        vm.errors = errors;
        vm.confirm = function() {
            $modalInstance.dismiss();
        };
    }
}());