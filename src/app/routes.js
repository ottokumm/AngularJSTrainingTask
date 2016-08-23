(function() {
	'use strict';

	angular
		.module('app')
		.config(routes);

	function routes($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('shell', {
				url: '',
				abstract: true,
				templateUrl: 'app/pages/shell.html'
			})
			.state('shell.courses', {
				url: '/courses',
				templateUrl: 'app/pages/courses/courses.html',
				controller: 'coursesCtrl',
				controllerAs: 'vm',
				title: 'Courses List',
				data: {
					authNeeded: true,
					displayName: 'Courses'
				}
			})
			.state('shell.courses.course', {
				url: '/{id:int}',
				templateUrl: 'app/pages/course/course.html',
				controller: 'courseCtrl',
				controllerAs: 'vm',
				title: 'Course',
				resolve: {
					course: function(coursesService, $stateParams) {
						return coursesService.getCourseById($stateParams.id);
					}
				},
				data: {
					authNeeded: true,
					displayName: '{{ course.title }}'
				}
			})
			.state('shell.courses.courseNew', {
				url: '/new',
				templateUrl: 'app/pages/course/course.html',
				controller: 'courseNewCtrl',
				controllerAs: 'vm',
				title: 'New Course',
				data: {
					authNeeded: true,
					displayName: '{{ course.title }}'
				}
			})
			.state('shell.login', {
				url: '/login',
				controller: 'loginCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/login/login.html',
				title: 'Login',
				data: {
					authNeeded: false,
					displayName: 'Login'
				}
			});

		$urlRouterProvider.otherwise('/courses');
	}
}());