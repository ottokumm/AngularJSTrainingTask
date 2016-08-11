(function() {
    'use strict';
    angular
        .module('app.common')
        .factory('coursesService', coursesService);

    function coursesService($http, $resource) {
        var Resource = $resource('/courses/:id', {
            id: '@id'
        });

        return {
            getCourses: getCourses
        };

        function getCourses() {
            return Resource.query();
        }
    }
}());
