(function() {
    'use strict';

    angular
        .module('app')
        .controller('coursesCtrl', coursesCtrl, ['$rootScope']);

    function coursesCtrl($modal, coursesService, modalDeleteService, $rootScope) {
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

        function setValue(val) {
            fValue = val;
        }

        function getValue() {
            return fValue;
        }

        vm.deleteCourse = function(course) {
            var modalInstance = modalDeleteService.getModalInstance(course);

            modalInstance.result.then(function(result) {
                coursesService.deleteCourse(result);
                vm.courses = coursesService.getCourses();
            });
        };
    }
}());