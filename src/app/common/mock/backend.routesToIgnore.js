(function() {
	'use strict';

	angular
		.module('app.backend')
		.run(routesToIgnore);

	function routesToIgnore($httpBackend) {
		$httpBackend.whenGET(/.*/).passThrough();
		$httpBackend.whenPOST(/.*/).passThrough();
		$httpBackend.whenPUT(/.*/).passThrough();
		$httpBackend.whenDELETE(/.*/).passThrough();
	}
}());
