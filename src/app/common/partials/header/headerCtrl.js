(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('headerCtrl', headerCtrl);

    function headerCtrl($rootScope, $state, authService) {
        var vm = this;

        vm.logout = authService.logout;

        $rootScope.$on('isAuthenticated', function() { //eslint-disable-line
            displayDashboard(authService.getUserName(), true);
        });

        $rootScope.$on('isNotAuthenticated', function() { //eslint-disable-line
            displayDashboard(null, false);
        });

        function displayDashboard(userName, display) {
            vm.userName = userName;
            vm.displayDashboard = display;
        }
    }
}());