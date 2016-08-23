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
		]);
}());