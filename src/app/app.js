(function() {
	'use strict';

	angular
		.module('app', [
			'ui.router',
			'ui.bootstrap',
			'ngResource',
			'ngMessages',
			'ngStorage',
			'ngMockE2E',
			'app.common',
			'app.backend'
		])
		.run(run);

	function run($rootScope, $state, authService) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState) { //eslint-disable-line        
			var authResult = authService.isAuth();

			if (toState.data.authNeeded && !authResult) {
				event.preventDefault();
				$state.go('shell.login');
			}
			if (toState.name === 'shell.login' && authResult) {
				event.preventDefault();
				$state.go('shell.courses');
			}
		});
	}
}());