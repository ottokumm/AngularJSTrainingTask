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
				title: 'Courses List'
			})
			.state('shell.course', {
				url: '/course',
				templateUrl: 'app/pages/course/course.html',
				title: 'Course'
			})
			.state('shell.login', {
				url: '/login',
				templateUrl: 'app/pages/login/login.html',
				title: 'Login'
			});

		$urlRouterProvider.otherwise('/login');
	}
}());
