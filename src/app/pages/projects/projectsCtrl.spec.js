/// <reference path="../../testHelpers/_reference.js" />
/// <reference path="projectsCtrl.js" />

(function () {
	'use strict';

	describe('projectsCtrl', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var $state,
			$q,
			projectsData = [1, 2, 3],
			confirmationModal,
			vm,
			$rootScope,
			projectsService;

		beforeEach(inject(function ($controller, _$q_, _$rootScope_) {
			$q = _$q_;
			$rootScope = _$rootScope_;
			confirmationModal = {
				show: function () {
					return $q.when({});
				}
			};
			$state = {
				go: function () {
					return true;
				}
			};
			spyOn($state, 'go');
			projectsService = {
				query: function () {
					return $q.when({ data: projectsData });
				}
			};

			spyOn(projectsService, 'query').and.callThrough();

			vm = $controller('projectsCtrl', {
				projectsService: projectsService,
				$state: $state,
				confirmationModal: confirmationModal
			});

			$rootScope.$digest();
		}));

		it('should activate() load projects list at start', function () {
			//Assert
			expect(vm).toBeDefined();
			expect(vm.projects).toBeDefined();
			expect(vm.projects.length).toBe(projectsData.length);
			expect(projectsService.query).toHaveBeenCalled();
		});

		it('should redirect to project details by click with id === 1', function () {
			// Arrange
			var project = {
				id: 1
			};

			// Act
			vm.redirectToDetails(project);

			// Assert
			expect($state.go).toHaveBeenCalled();
		});

		it('should redirect to project details by click with id === 2', function () {
			// Arrange
			var project = {
				id: 2
			};

			// Act
			vm.redirectToDetails(project);

			// Assert
			expect($state.go).toHaveBeenCalled();
			expect($state.go.calls.mostRecent().args[1]).toBe(null);
		});

	});

}());
