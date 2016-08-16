(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('headerCtrl', headerCtrl);

    function headerCtrl($rootScope, $state, authService) {
        var vm = this;

        vm.logout = authService.logout;
        vm.displayDashboard = displayDashboard($state);
        vm.userName = authService.getUserName();


        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) { //eslint-disable-line           
            if (toState.data.authNeeded && !authService.isAuth()) {
                $state.go('shell.login');
                toState = $state.current;
                event.preventDefault();
            }

            vm.displayDashboard = displayDashboard(toState);
            vm.userName = authService.getUserName();
        });

        function displayDashboard(toState) {
            return toState.name !== 'shell.login';
        }
    }
}());