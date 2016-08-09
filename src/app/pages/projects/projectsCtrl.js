(function () {
	'use strict';

	angular.module('app')
		.controller('projectsCtrl', projectsCtrl);

	function projectsCtrl($state, projectsService) {
		var vm = this;

		vm.projects = [];
		vm.isLoading = true;
		vm.redirectToDetails = redirectToDetails;
		activate();

		///

		function activate() {

			projectsService.query().then(function (res) {
				vm.projects = res.data;
			});
		}


		function redirectToDetails(project) {
			if (project.id === 1) {
				$state.go('shell.projectDetails', project.id);
			}
			else {
				$state.go('shell.projectDetails', null);
			}
		}
	}
}());



