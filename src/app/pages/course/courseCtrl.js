(function() {
    'use strict';

    angular
        .module('app')
        .controller('courseCtrl', courseCtrl);

    courseCtrl.$inject = ['$scope', '$stateParams', '$state', 'coursesService', 'errorLog', 'modalValidationService'];

    function courseCtrl($scope, $stateParams, $state, coursesService, errorLog, modalValidationService) {
        var vm = this,
            id = $stateParams.id;

        init();

        vm.save = save;

        function init() {
            coursesService.getCourseById(id).then(
                function(data) {
                    vm.course = data;
                },
                function(error) {
                    $state.go('shell.courses');
                }
            );
        }

        function save() {
            if ($scope.form.$valid) {
                coursesService.updateCourse(vm.course);
                $state.go('shell.courses');
            } else {
                modalValidationService.getModalInstance(errorLog.getErrors($scope.form.$error, ['btfDatetime', 'required']));
            }
        }
    }
}());