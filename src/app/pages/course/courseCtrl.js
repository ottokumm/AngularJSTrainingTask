(function() {
    'use strict';

    angular
        .module('app')
        .controller('courseCtrl', courseCtrl);

    function courseCtrl($stateParams, $state, coursesService) {
        var vm = this,
            id = $stateParams.id;

        coursesService.getCourseById(id).then(
            function(data) {
                vm.course = data;
            },
            function(error) {
                $state.go('shell.courses');
            }
        );

        vm.save = function() {
            coursesService.updateCourse(vm.course);
            $state.go('shell.courses');
        };
    }
}());