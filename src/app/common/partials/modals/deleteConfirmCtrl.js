(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('deleteConfirmCtrl', deleteConfirmCtrl, ['course']);

    function deleteConfirmCtrl($modalInstance, course) {
        var vm = this;

        vm.courseToDelete = course.title;
        vm.confirm = function() {
            $modalInstance.close(course.id);
        };

        vm.decline = function() {
            $modalInstance.dismiss();
        };
    }
}());