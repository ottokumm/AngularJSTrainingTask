(function() {
    'use strict';

    angular
        .module('app.common')
        .run(run);

    function run($httpBackend) {
        var courses = [{
                'id': 1,
                'title': 'Some Videocourse 1',
                'duration': 123,
                'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                'datetime': '23/14/2005'
            }, {
                'id': 2,
                'title': 'Some Videocourse 2',
                'duration': 182,
                'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                'datetime': '23/14/2006'
            }, {
                'id': 3,
                'title': 'Some Videocourse 3',
                'duration': 116,
                'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
                'datetime': '23/14/2007'
            }],
            lastId = 3;

        $httpBackend.whenGET('/courses').respond(courses);

        $httpBackend.whenGET(/\/courses\/(\d+)/).respond(
            function(method, url, data, headers) {
                var mockId = url.match(/\/courses\/(\d+)/)[1],
                    course = getItemById(mockId);
                if (angular.isUndefined(course)) {
                    return [404, undefined];
                }
                return [200, course];
            }
        );

        $httpBackend.whenPOST('/courses').respond(
            function(method, url, data, headers) {
                var course = angular.fromJson(data).course;

                lastId += 1;
                course.id = lastId;
                courses.push(course);

                return [200];
            }
        );

        $httpBackend.whenPUT('/courses').respond(
            function(method, url, data, headers) {
                var course = angular.fromJson(data).course,
                    index = updateItemById(course.id, course);

                if (angular.isUndefined(index)) {
                    return [404];
                }
                return [200];
            }
        );

        $httpBackend.whenDELETE(/\/courses\/(\d+)/).respond(
            function(method, url, data, headers) {
                var mockId = url.match(/\/courses\/(\d+)/)[1],
                    result = deleteItemById(mockId);

                if (angular.isUndefined(result)) {
                    return [404];
                }
                return [200];
            }
        );

        function getItemById(id) {
            return _.find(courses, function(i) {
                return i.id === _.parseInt(id);
            });
        }

        function updateItemById(id, item) {
            var index = _.findIndex(courses, function(i) {
                return i.id === _.parseInt(id);
            });

            courses[index] = item;

            return index;
        }

        function deleteItemById(id) {
            return _.remove(courses, function(i) {
                return i.id === _.parseInt(id);
            });
        }
    }
}());