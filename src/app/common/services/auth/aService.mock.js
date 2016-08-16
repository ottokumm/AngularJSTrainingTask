(function() {
    'use strict';

    angular
        .module('app.common')
        .run(run);

    function run($httpBackend) {
        var user = {
            username: 'user',
            password: 'root',
            firstName: 'user',
            lastName: 'test'
        };

        $httpBackend.whenPOST('/login').respond(function(method, url, data) {
            var credentials = angular.fromJson(data),
                result;

            if (credentials.username === user.username && credentials.password === user.password) {
                result = [200, {
                    token: 'fake-token'
                }];
            } else {
                result = [404, undefined];
            }

            return result;
        });
    }
}());