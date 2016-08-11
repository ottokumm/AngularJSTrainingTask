(function() {
    'use strict';

    angular
        .module('app')
        .controller('coursesCtrl', coursesCtrl);

    function coursesCtrl($scope, coursesService) {
        var vm = this;

        vm.courses = coursesService.getCourses();
    }
}());
