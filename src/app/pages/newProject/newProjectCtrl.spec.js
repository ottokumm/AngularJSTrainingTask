/// <reference path="../../testHelpers/_reference.js" />
/// <reference path="../../common/services/industries/industriesService.js" />
/// <reference path="newProjectCtrl.js" />
(function () {
	'use strict';

	describe('newProjectCtrl', function () {
		beforeEach(module('app'));
		beforeEach(module('app.common'));
		beforeEach(module('ngMockE2E'));

		var $controller,
			$scope,
			vm,
			projectsService,
			industriesService,
			$rootScope,
			$state,
			$q;

		beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			$q = _$q_;
			$scope = $rootScope.$new();
			projectsService = {};
			industriesService = {};

			mock(projectsService, 'create', $q.when({}));
			mock(industriesService, 'searchIndustriesByTerm', $q.when({}));

			$state = {
				go: jasmine.createSpy()
			};

			vm = $controller('newProjectCtrl', {
				$scope: $scope,
				$window: { alert: function () { } },
				projectsService: projectsService,
				industriesService: industriesService,
				$state: $state
			});
		}));

		it('should initialize', function () {
			expect(vm).toBeDefined();
			expect(vm.project).toBeDefined();
		});

		it('should searchIndustries by term', function () {
			// Arrange
			var term = 'Health';

			// Act
			vm.searchIndustriesByTerm(term);

			// resolves promise
			$rootScope.$digest();

			// Assert
			expect(industriesService.searchIndustriesByTerm).toHaveBeenCalledWith(term);
		});

		it('should clear industry', function () {
			// Arrange
			vm.selectedIndustry = 'Health';

			// Act
			vm.clearIndustry();

			// Assert
			expect(vm.selectedIndustry).toBe(null);
		});

		it('should add industry', function () {
			// Arrange
			var industry = {
				id: 1,
				name: 'Health',
				description: '...'
			};

			vm.project = {
				targetIndustries: []
			};

			vm.selectedIndustry = 'Health';

			// Act
			vm.onSelectIndustry(industry);

			// Assert
			expect(vm.selectedIndustry).toBe(null);
			expect(vm.project.targetIndustries.length).toBe(1);
			expect(vm.project.targetIndustries).toContain(industry);
		});

		it('should add not existing industry to the top', function () {
			// Arrange
			var industry = {
				id: 3,
				name: 'Health3',
				description: '...'
			};
			vm.project = {
				targetIndustries: [
					{
						id: 1,
						name: 'Health1',
						description: '...'
					},
					{
						id: 2,
						name: 'Health2',
						description: '...'
					}
				]
			};

			vm.selectedIndustry = 'Health';

			// Act
			vm.onSelectIndustry(industry);

			// Assert
			expect(vm.selectedIndustry).toBe(null);
			expect(vm.project.targetIndustries.length).toBe(3);
			expect(vm.project.targetIndustries[0]).toBe(industry);
		});


		it('should not add existing industry', function () {
			// Arrange
			var industry = {
				id: 1,
				name: 'Health2',
				description: '...'
			};
			vm.project = {
				targetIndustries: [
					{
						id: 1,
						name: 'Health1',
						description: '...'
					},
					{
						id: 2,
						name: 'Health2',
						description: '...'
					}
				]
			};

			vm.selectedIndustry = 'Health';

			// Act
			vm.onSelectIndustry(industry);

			// Assert
			expect(vm.project.targetIndustries.length).toBe(2);
		});

		it('should remove industry', function () {
			// Arrange
			vm.project = {
				targetIndustries: [
					{
						id: 1,
						name: 'Health1',
						description: '...'
					},
					{
						id: 2,
						name: 'Health2',
						description: '...'
					}
				]
			};

			// Act
			vm.removeIndustry(2);

			// Assert
			expect(vm.project.targetIndustries.length).toBe(1);
		});


		it('should prevent invalid project from saving', function () {
			// Assert
			vm.project = {
				name: 'Test',
				description: 'Test',
				targetIndustries: [{ id: 1 }, { id: 2 }]
			};

			// Act
			vm.createProject({
				$valid: false
			});

			// Assert
			expect(projectsService.create).not.toHaveBeenCalled();
		});

	});
}());
