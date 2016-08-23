(function() {
    'use strict';
    angular
        .module('app.common')
        .factory('coursesService', coursesService);

    function coursesService($http, $resource) {
        var CourseResource = $resource('/courses/:id', {
                id: '@id'
            }, {
                'update': {
                    method: 'PUT'
                },
                'remove': {
                    method: 'DELETE'
                }
            }),
            AuthorResourse = $resource('/courses/:id', {
                id: 'new'
            });

        return {
            getCourses: getCourses,
            getCourseById: getCourseById,
            updateCourse: updateCourse,
            addNewCourse: addNewCourse,
            deleteCourse: deleteCourse,
            getAuthors: getAuthors
        };

        function getCourses() {
            return CourseResource.query();
        }

        function getAuthors() {
            return AuthorResourse.query();
        }

        function getCourseById(id) {
            return CourseResource.get({
                id: id
            }).$promise;
        }

        function updateCourse(course) {
            CourseResource.update({
                course: course
            });
        }

        function addNewCourse(course) {
            CourseResource.save({
                course: course
            });
        }

        function deleteCourse(id) {
            return CourseResource.remove({
                id: id
            });
        }
    }
}());