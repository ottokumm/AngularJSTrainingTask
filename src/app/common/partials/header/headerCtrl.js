(function() {
    'use strict';

    angular
        .module('app.common')
        .controller('headerCtrl', headerCtrl);

    function headerCtrl($rootScope, authService) {
        var vm = this;

        vm.logout = authService.logout;

        init();

        $rootScope.$on('isAuthenticated', function() { //eslint-disable-line
            displayDashboard(authService.getUserName(), true);
        });

        $rootScope.$on('isNotAuthenticated', function() { //eslint-disable-line
            displayDashboard(null, false);
        });

        function init() {
            displayDashboard(authService.getUserName(), authService.isAuth());
        }

        function displayDashboard(userName, display) {
            vm.userName = userName;
            vm.displayDashboard = display;
        }
    }
}());