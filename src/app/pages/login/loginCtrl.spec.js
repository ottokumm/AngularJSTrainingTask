(function() {
    'use strict';

    describe('loginCtrl', function() {
        beforeEach(module('app'));
        beforeEach(module('app.common'));
        beforeEach(module('ngMockE2E'));

        var $scope,
            $controller,
            $q,
            authService,
            vm;

        beforeEach(angular.mock.inject(function(_$controller_, _$q_, _$rootScope_, _authService_) {
            $controller = _$controller_;

            $q = _$q_;

            authService = _authService_;

            $scope = _$rootScope_.$new();

            vm = $controller('loginCtrl');
        }));

        it('should initialize', function() {
            expect(vm).toBeDefined();
        });

        it('should initialize credentials', function() {
            expect(vm.credentials.login).toBe('');
            expect(vm.credentials.password).toBe('');
        });

        it('should initialize error', function() {
            expect(vm.error).toBe(false);
        });

        it('should disable login submit', function() {
            var res;

            vm.credentials.login = '';
            vm.credentials.password = '';

            res = vm.loginDisable();

            expect(res).toBe(true);
        });

        it('should enable login submit', function() {
            var res;

            vm.credentials.login = '_';
            vm.credentials.password = '_';

            res = vm.loginDisable();

            expect(res).toBe(false);
        });

        it('should initialize login', function() {
            expect(vm.login).toBeDefined();
            expect(vm.loginDisable).toBeDefined();
        });

        describe('login function', function() {
            var deferred;

            beforeEach(function() {
                deferred = $q.defer();

                spyOn(authService, 'login').and.returnValue(deferred.promise);

                vm.login();
            });

            it('should call authService', function() {
                expect(authService.login).toHaveBeenCalled();
            });

            it('should call redirect on success', inject(function($state) {
                spyOn($state, 'go');

                deferred.resolve();

                $scope.$apply();

                expect($state.go).toHaveBeenCalled();
            }));

            it('should set error to be true on failure', inject(function($state) {
                spyOn($state, 'go');

                deferred.reject();

                $scope.$apply();

                expect(vm.error).toBe(true);
            }));
        });
    });
}());