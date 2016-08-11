(function() {
    'use strict';
    angular
        .module('app')
        .factory('coursesService', coursesService);

    function coursesService() {
        var courses = [{
            'title': 'Some Videocourse 1',
            'duration': 123,
            'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
            'datetime': '23/14/2005'
        }, {
            'title': 'Some Videocourse 2',
            'duration': 182,
            'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
            'datetime': '23/14/2006'
        }, {
            'title': 'Some Videocourse 3',
            'duration': 116,
            'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
            'datetime': '23/14/2007'
        }];

        return {
            getCourses: getCourses
        };

        function getCourses() {
            return courses;
        }
    }
}());
