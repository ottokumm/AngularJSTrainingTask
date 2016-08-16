(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginCtrl', loginCtrl);

    function loginCtrl($state, authService) {
        var vm = this;

        vm.credentials = {
            login: '',
            password: ''
        };

        vm.error = false;

        vm.loginDisable = function() {
            return vm.credentials.login === '' || vm.credentials.password === '';
        };

        vm.login = function(credentials) {
            vm.loading = true;
            vm.errorMessage = '';

            authService.login(vm.credentials.login, vm.credentials.password).then(
                function(data) {
                    $state.go('shell.courses');
                },
                function(error) {
                    vm.errorMessage = 'Username or password is incorrect';
                    vm.loading = false;
                    vm.error = true;
                    vm.credentials.password = '';
                }
            );
        };
    }
}());