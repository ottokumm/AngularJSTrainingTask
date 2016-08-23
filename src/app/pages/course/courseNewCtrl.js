(function() {
    'use strict';

    angular
        .module('app')
        .controller('courseNewCtrl', courseNewCtrl);

    courseNewCtrl.$inject = ['$scope', '$state', 'coursesService', 'modalValidationService', 'errorLog'];

    function courseNewCtrl($scope, $state, coursesService, modalValidationService, errorLog) {
        var vm = this;

        vm.course = {
            'id': 0,
            'title': '',
            'duration': 0,
            'description': '',
            'datetime': '',
            'authors': [],
            'avAuthors': [{
                'id': 0
            }]
        };

        vm.course.avAuthors = coursesService.getAuthors();

        vm.save = function() {
            if ($scope.form.$valid) {
                coursesService.addNewCourse(vm.course);
                $state.go('shell.courses');
            } else {
                modalValidationService.getModalInstance(errorLog.getErrors($scope.form.$error, ['btfDatetime', 'required']));
            }
        };
    }
}());