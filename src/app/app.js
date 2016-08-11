(function() {
	'use strict';
	angular
		.module('app', [
			'ui.router',
			'ngResource',
			'ngMockE2E',
			'app.common',
			'app.backend'
		]);
}());
