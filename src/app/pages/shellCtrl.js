(function () {
	'use strict';

	angular.module('app')
		.controller('shellCtrl',

	function ($scope) {
		var vm = this;

		vm.menuIsOpen = false;
		vm.toggleMenu = toggleMenu;

		function toggleMenu() {
			vm.menuIsOpen = !vm.menuIsOpen;
		}

		$scope.$on('$destroy',
			$scope.$on('$locationChangeStart', function () {
				vm.menuIsOpen = false;
			}));
	});

}());
