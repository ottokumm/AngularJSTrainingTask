(function() {
    'use strict';

    angular
        .module('app')
        .controller('courseNewCtrl', courseNewCtrl);

    function courseNewCtrl($state, coursesService) {
        var vm = this;

        vm.course = {
            'id': 0,
            'title': '',
            'duration': 0,
            'description': '',
            'datetime': ''
        };

        vm.save = function() {
            coursesService.addNewCourse(vm.course);
            $state.go('shell.courses');
        };
    }
}());