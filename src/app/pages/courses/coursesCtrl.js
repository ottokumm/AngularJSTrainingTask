(function() {
    'use strict';

    angular
        .module('app')
        .controller('coursesCtrl', coursesCtrl);

    function coursesCtrl($log, $modal, coursesService) {
        var vm = this,
            fValue = '';

        vm.filterValue = '';

        vm.courses = coursesService.getCourses();

        vm.filter = {
            setValue: setValue,
            getValue: getValue
        };


        function setValue(val) {
            fValue = val;
        }

        function getValue() {
            return fValue;
        }

        vm.deleteCourse = function(course) {
            var modalInstance = $modal.open({
                templateUrl: 'app/common/partials/modals/deleteConfirm.html',
                controller: 'deleteConfirmCtrl',
                controllerAs: 'vm',
                resolve: {
                    course: function() {
                        return course;
                    }
                }
            });

            modalInstance.result.then(function(result) {
                coursesService.deleteCourse(result);
                vm.courses = coursesService.getCourses();
            });
        };
    }
}());