(function() {
    'use strict';

    angular
        .module('app')
        .controller('coursesCtrl', coursesCtrl);

    coursesCtrl.$inject = ['$modal', '$rootScope', 'coursesService', 'modalDeleteService'];

    function coursesCtrl($modal, $rootScope, coursesService, modalDeleteService) {
        var vm = this,
            fValue = '';

        vm.filterValue = '';

        vm.courses = coursesService.getCourses();

        $rootScope.$on('$stateChangeSuccess', function() { //eslint-disable-line
            vm.courses = coursesService.getCourses();
        });

        vm.filter = {
            setValue: setValue,
            getValue: getValue
        };

        vm.deleteCourse = deleteCourse;

        function setValue(val) {
            fValue = val;
        }

        function getValue() {
            return fValue;
        }

        function deleteCourse(course) {
            var modalInstance = modalDeleteService.getModalInstance(course);

            modalInstance.result.then(function(result) {
                coursesService.deleteCourse(result);
                vm.courses = coursesService.getCourses();
            });
        }
    }
}());