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
				controller: 'shellCtrl',
				controllerAs: 'vm',
				templateUrl: 'app/pages/shell.html'
			})
			.state('shell.projects', {
				url: '/projects',
				templateUrl: 'app/pages/courses/courses.html',
				controller: 'projectsCtrl',
				controllerAs: 'vm',
				title: 'Projects List'
			})
			.state('shell.newProject', {
				url: '/newProject',
				templateUrl: 'app/pages/newProject/newProject.html',
				controller: 'newProjectCtrl',
				controllerAs: 'vm',
				title: 'New Project'
			});

		$urlRouterProvider.otherwise('/projects');
	}
}());
