(function () {
	'use strict';

	angular.module('app')
		.controller('newProjectCtrl', newProjectCtrl);

	function newProjectCtrl($scope, $window, $state, projectsService, industriesService) {
		var vm = this;
		vm.project = {
			name: '',
			description: '',
			targetIndustries: []
		};

		vm.projectNameMaxLength = 150;
		vm.projectDescriptionMaxLength = 4000;
		vm.targetIndustriesTypeaheadMinLength = 3;

		vm.selectedIndustry = null;
		vm.searchIndustriesByTerm = searchIndustriesByTerm;
		vm.clearIndustry = clearIndustry;
		vm.onSelectIndustry = onSelectIndustry;
		vm.removeIndustry = removeIndustry;

		vm.createProject = createProject;
		vm.createProjectInProcess = false;

		///

		function searchIndustriesByTerm(term) {
			return industriesService.searchIndustriesByTerm(term).then(function (res) {
				return res.data;
			});
		}

		function clearIndustry () {
			vm.selectedIndustry = null;
		}

		function onSelectIndustry($item) {
			_.remove(vm.project.targetIndustries, { id: $item.id });
			vm.project.targetIndustries.unshift($item);
			vm.selectedIndustry = null;
		}

		function removeIndustry(industryId) {
			_.remove(vm.project.targetIndustries, { id: industryId });
		}


		function createProject(projectForm) {
			// Mark every control as touched to force highlighting
			_.forOwn(projectForm, function (prop) {
				if (prop && prop.$touched === false) {
					prop.$setTouched();
				}
			});

			if (projectForm.$valid) {
				var project = {
					name: vm.project.name,
					description: vm.project.description,
					targetIndustriesIds: _.map(vm.project.targetIndustries, function (i) {
						return i.id;
					})
				};

				// Save to server
				vm.createProjectInProcess = true;

				projectsService.create(project).then(function () {
					$state.go('shell.projects');
				});
			}
		}
	}

}());
