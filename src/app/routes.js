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
					authNeeded: true
				}
			})
			.state('shell.course', {
				url: '/courses/:id',
				templateUrl: 'app/pages/course/course.html',
				controller: 'courseCtrl',
				controllerAs: 'vm',
				title: 'Course',
				data: {
					authNeeded: true
				}
			})
			.state('shell.courseNew', {
				url: '/courses/new',
				templateUrl: 'app/pages/course/course.html',
				controller: 'courseNewCtrl',
				controllerAs: 'vm',
				title: 'New Course',
				data: {
					authNeeded: true
				}
			})
			.state('shell.login', {
				url: '/login',
				controller: 'loginCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/login/login.html',
				title: 'Login',
				data: {
					authNeeded: false
				}
			});

		$urlRouterProvider.otherwise('/courses');
	}
}());