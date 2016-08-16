(function() {
    'use strict';
    angular
        .module('app.common')
        .factory('coursesService', coursesService);

    function coursesService($http, $resource) {
        var Resource = $resource('/courses/:id', {
            id: '@id'
        }, {
            'update': {
                method: 'PUT'
            },
            'remove': {
                method: 'DELETE'
            }
        });

        return {
            getCourses: getCourses,
            getCourseById: getCourseById,
            updateCourse: updateCourse,
            addNewCourse: addNewCourse,
            deleteCourse: deleteCourse
        };

        function getCourses() {
            return Resource.query();
        }

        function getCourseById(id) {
            return Resource.get({
                id: id
            }).$promise;
        }

        function updateCourse(course) {
            Resource.update({
                course: course
            });
        }

        function addNewCourse(course) {
            Resource.save({
                course: course
            });
        }

        function deleteCourse(id) {
            return Resource.remove({
                id: id
            });
        }
    }
}());